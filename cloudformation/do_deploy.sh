#!/bin/bash
set -eu

source config.ini

# Imports
. ./deploy_stack.sh

echo "Upload nested templates"
aws s3 cp nested/ s3://${S3_NESTED_BUCKET}/ --recursive

echo "Build docker images"
build_nginx_docker_image uri_image_nginx
build_web_docker_image uri_image_web

echo "Deploy stack"
deploy_main_stack ${uri_image_nginx} ${uri_image_web}
