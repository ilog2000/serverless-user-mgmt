# serverless-user-mgmt

This is a demo project to show how to create and deploy a serverless application on AWS cloud. It provides a simple web interface for user management.

## The technological stack

Back end:
* node.js
* koa.js v2
* serverless-http
* DynamoDB

Front end:
* mithril.js

## Running locally

To start playing with it, clone the repository and install node packages:
```
git clone https://github.com/ilog2000/serverless-user-mgmt
cd serverless-user-mgmt
yarn
```
To run it locally, you will need to set up a [local copy of DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html). Note, that it requres Java runtime to be available on your machine. After download, unzip an archive, and execute the following command:
```
java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
```
Now create `.env` file from `.env.example`.

Further steps are to execute scripts from package.json to create and fill in DynamoDB 'users' table:
```
yarn dev-dynamodb-create
yarn dev-dynamodb-populate
```
... and to check the results:
```
yarn dev-dynamodb-query
```
In order to run the API back end, you can use the next script:
```
yarn dev-lambda
```
Behind the scene `serverless-offline` plugin is executed.

The following command will start a development server for the front end:
```
yarn serve
```
The web application can be open on [localhost:5000](http://localhost:5000).

## Deployment to AWS

_NOTE_: Do not forget to update your `.env` file with production settings.

You can deploy to AWS with these commands:
```
yarn prod-lambda
yarn prod-dynamodb-create
yarn prod-dynamodb-populate
yarn prod-dynamodb-delete
yarn prod-dynamodb-query
yarn s3-create-bucket
yarn s3-upload-objects
yarn s3-configure-site
```

These scripts create AWS Lambda function for API, DynamoDB storage, and static web site located in S3 bucket.

## TODO

* Improve error handling, which is very basic now
* Add script for setting up permissions for DynamoDB access from Lambda; as for now, this is done manually
* Describe required operations in AWS console in details
