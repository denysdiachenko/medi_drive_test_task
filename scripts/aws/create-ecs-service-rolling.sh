#!/usr/bin/env bash
set -euo pipefail

# Required env vars
: "${AWS_REGION:?Set AWS_REGION}"
: "${ECS_CLUSTER:?Set ECS_CLUSTER}"
: "${ECS_SERVICE:?Set ECS_SERVICE}"
: "${TASK_DEFINITION:?Set TASK_DEFINITION}"
: "${DESIRED_COUNT:?Set DESIRED_COUNT}"
: "${SUBNETS:?Set SUBNETS (comma-separated)}"
: "${SECURITY_GROUPS:?Set SECURITY_GROUPS (comma-separated)}"
: "${TG_ARN:?Set TG_ARN}"
: "${CONTAINER_NAME:?Set CONTAINER_NAME}"
: "${CONTAINER_PORT:?Set CONTAINER_PORT}"

# Optional
ASSIGN_PUBLIC_IP=${ASSIGN_PUBLIC_IP:-DISABLED}
MIN_HEALTHY_PERCENT=${MIN_HEALTHY_PERCENT:-100}
MAX_PERCENT=${MAX_PERCENT:-200}

IFS=',' read -r -a SUBNET_ARR <<< "$SUBNETS"
IFS=',' read -r -a SG_ARR <<< "$SECURITY_GROUPS"

SUBNETS_CSV=$(IFS=,; echo "${SUBNET_ARR[*]}")
SGS_CSV=$(IFS=,; echo "${SG_ARR[*]}")

aws ecs create-service \
  --region "$AWS_REGION" \
  --cluster "$ECS_CLUSTER" \
  --service-name "$ECS_SERVICE" \
  --task-definition "$TASK_DEFINITION" \
  --desired-count "$DESIRED_COUNT" \
  --launch-type EC2 \
  --deployment-configuration "maximumPercent=$MAX_PERCENT,minimumHealthyPercent=$MIN_HEALTHY_PERCENT" \
  --network-configuration "awsvpcConfiguration={subnets=[$SUBNETS_CSV],securityGroups=[$SGS_CSV],assignPublicIp=$ASSIGN_PUBLIC_IP}" \
  --load-balancers "targetGroupArn=$TG_ARN,containerName=$CONTAINER_NAME,containerPort=$CONTAINER_PORT" \
  --enable-execute-command
