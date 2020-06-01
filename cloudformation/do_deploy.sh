#!/bin/bash
set -eu

source config.ini

# Imports
. ./deploy_stack.sh

echo "Upload nested templates"
aws s3 cp nested/ s3://${S3_NESTED_BUCKET}/ --recursive

echo "Deploy stack"
deploy_main_stack
