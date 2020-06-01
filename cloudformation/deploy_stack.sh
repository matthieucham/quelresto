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
    $(aws ecr get-login --no-include-email --region ${REGION})

    if [[ -n "${lfpolicy}" ]]; then
        # set lifecycle policy over repo
        aws ecr put-lifecycle-policy --repository-name ${repo_ecr_name} --lifecycle-policy-text "${lfpolicy}"
    fi

    eval "$1=${repo_ecr_name}"
    eval "$2=${repo_ecr_uri}"
}

build_docker_image(){

    echo "+--------------------+"
	echo "| Build docker image |"
	echo "+--------------------+"

    local next_sonar_tag="$3"

    init_ecr_repo ecr_name ecr_uri ${APP_ECR} "file://scripts/deployment/ecr_policy.json"

    formated_date=`date +%Y-%m-%d-%H%M%S`
    docker_image_tag=${formated_date}_${next_sonar_tag}
    uri_docker_image=${ecr_uri}:${docker_image_tag}
    echo "Docker Image Name ${uri_docker_image}"

    docker build -t ${ecr_name} -t ${uri_docker_image} --build-arg IMAGE_TAG=${next_sonar_tag} .
    docker push ${uri_docker_image}

    eval "$1=${uri_docker_image}"
    eval "$2=${docker_image_tag}"
}

deploy_main_stack(){

    echo "+-------------------+"
	echo "| Deploy main stack |"
	echo "+-------------------+"

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
        --tags \
            Project=${PROJECT_NAME} \
        --capabilities CAPABILITY_IAM CAPABILITY_AUTO_EXPAND CAPABILITY_NAMED_IAM \
        --region ${REGION} \
        --no-fail-on-empty-changeset
}
