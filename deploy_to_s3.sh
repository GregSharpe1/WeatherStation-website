#!/bin/bash
# Setting Global Variables
BUCKET_NAME="weather.gregsharpe.co.uk"
DIR_TO_UPLOAD="build/"

# First step: Check if the bucket name exists, if not create one
aws s3 ls s3://${BUCKET_NAME}  &> /dev/null

if [[ $? -eq 0 ]]
  then
    echo "Bucket (${BUCKET_NAME}) exists"
else
    # Exit if the bucket doesn't exist
    exit
fi

#Upload files to S3
echo "Uploading contents of "${DIR_TO_UPLOAD}" to ${BUCKET_NAME}"
aws s3 cp "${DIR_TO_UPLOAD}" s3://"${BUCKET_NAME}"/ --recursive --exclude ".*" --exclude "README.md" --acl public-read
