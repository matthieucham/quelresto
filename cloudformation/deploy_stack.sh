init_ecr_repo(){

    local repo_ecr_name="$3"
    local lfpolicy="${4:-}"

    repo_ecr_uri=$(aws ecr describe-repositories --region ${REGION} --repository-name ${repo_ecr_name} | jq -r .repositories[].repositoryUri)
    if [[ -z "${repo_ecr_uri}" ]]; then
        echo "Repository ECR doesn't exist so we create repository"
        repo_ecr_uri=$(aws ecr create-repository --region ${REGION} --repository-name ${repo_ecr_name} | jq -r .repository.repositoryUri)
    fi
    echo "Repository ECR Name: ${repo_ecr_name}"
    echo "Repository ECR URI: ${repo_ecr_uri}"
    aws ecr get-login-password --region ${REGION} \
        | docker login --username AWS --password-stdin ${repo_ecr_uri}
    if [[ -n "${lfpolicy}" ]]; then
        # set lifecycle policy over repo
        aws ecr put-lifecycle-policy --repository-name ${repo_ecr_name} --lifecycle-policy-text "${lfpolicy}"
    fi

    eval "$1=${repo_ecr_name}"
    eval "$2=${repo_ecr_uri}"
}

build_nginx_docker_image(){
    echo "+--------------------------+"
	echo "| Build nginx docker image |"
	echo "+--------------------------+"

    init_ecr_repo ecr_name ecr_uri quelresto/quelresto-nginx "file://ecr_policy.json"
    docker build -t ${ecr_uri}:latest -f ../nginx/Dockerfile ../
    docker push ${ecr_uri}:latest

    eval "$1=${ecr_uri}:latest"
}

build_web_docker_image(){
    echo "+------------------------+"
	echo "| Build web docker image |"
	echo "+------------------------+"

    init_ecr_repo ecr_name ecr_uri quelresto/quelresto-web "file://ecr_policy.json"
    docker build -t ${ecr_uri}:latest -f ../quelresto_backend/Dockerfile.prd ../quelresto_backend
    docker push ${ecr_uri}:latest

    eval "$1=${ecr_uri}:latest"
}

deploy_main_stack(){

    echo "+-------------------+"
	echo "| Deploy main stack |"
	echo "+-------------------+"

    local uri_docker_nginx="$1"
    local uri_docker_web="$2"

    echo "Let's deploy the master cloudformation file to ${REGION}"
    
    aws cloudformation deploy \
        --template-file ./master.yml \
        --stack-name ${PROJECT_NAME} \
        --parameter-overrides \
            SSHRemoteAccessCIDR=${BASTION_CIDR} \
            BastionKeyPairName=${BASTION_KEYPAIR} \
            MinClusterSize=${MIN_CLUSTER_SIZE} \
            MaxClusterSize=${MAX_CLUSTER_SIZE} \
            DesiredClusterSize=${DESIRED_CLUSTER_SIZE} \
            ScalableMetricType=${AUTOSCALING_TRIGGER_TYPE} \
            ScalableMetricThreshold=${AUTOSCALING_TRIGGER_THRESHOLD} \
            Cooldown=${AUTOSCALING_TRIGGER_COOLDOWN} \
            InstanceType=${ECS_INSTANCE_TYPE} \
            DBPort=${DB_PORT} \
            DBType=${DB_TYPE} \
            DBVersion=${DB_VERSION} \
            DBInstanceClass=${DB_INSTANCECLASS} \
            DBAllocatedStorage=${DB_ALLOCATEDSTORAGE} \
            DBName=${DB_NAME} \
            DBUsername=${DB_USERNAME} \
            DBUserPassword=${DB_PASSWORD} \
            URIDockerImageNginx=${uri_docker_nginx} \
            URIDockerImageWeb=${uri_docker_web} \
            LBPriority=${LB_PRIORITY} \
            ScaleInCooldown=${AUTOSCALING_TRIGGER_SCALEINCOOLDOWN} \
            ScaleOutCooldown=${AUTOSCALING_TRIGGER_SCALEOUTCOOLDOWN} \
            ScaleTriggerType=${AUTOSCALING_TRIGGER_TYPE} \
            ScaleTriggerThreshold=${AUTOSCALING_TRIGGER_THRESHOLD} \
            MinInstanceCount=${MIN_INSTANCE_COUNT} \
            DesiredInstanceCount=${DESIRED_INSTANCE_COUNT} \
            MaxInstanceCount=${MAX_INSTANCE_COUNT} \
        --tags \
            Project=${PROJECT_NAME} \
        --capabilities CAPABILITY_IAM CAPABILITY_AUTO_EXPAND CAPABILITY_NAMED_IAM \
        --region ${REGION} \
        --no-fail-on-empty-changeset
}
