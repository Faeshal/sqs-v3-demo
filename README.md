## SQS Implementation in Node.js with AWS SDK V3 🧩

![](https://miro.medium.com/v2/resize:fit:1200/1*9z3sbaE6yGT1Ukau8iq4ew.png)

note: image above is only an illustration to illustrate the final result of how it will be used in a real project

Ref :

- [SQS SDK V3 - Docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/sqs/command/SendMessageCommand/)
- [SQS Consumer](https://www.npmjs.com/package/sqs-consumer)
- [Long Poll vs Short Poll](https://flofuchs.com/taking-a-look-at-aws-sqs-short-and-long-polling)

Note :

If you didn't specify credentials in your Node.js code and you were still able to send messages to the SQS queue, it's likely that the AWS SDK for JavaScript automatically picked up credentials from one of the following sources:

1. Environment Variables: The AWS SDK automatically checks for credentials in the environment variables AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY. If these variables are set in your environment, the SDK will use them.

2. Shared Credentials File: The AWS SDK looks for credentials in a shared credentials file located at ~/.aws/credentials on Linux/macOS or %USERPROFILE%\.aws\credentials on Windows. If you have configured credentials in this file, the SDK will use them.

3. IAM Role Assigned to the EC2 Instance: If your Node.js code is running on an Amazon EC2 instance, and that instance has an IAM role associated with it, the AWS SDK for JavaScript running on the instance will automatically use the IAM role's credentials.

4. AWS Container Services: If your Node.js code is running within an AWS service like AWS Lambda or AWS ECS (Elastic Container Service), the SDK will automatically use the IAM role associated with that service.

5. Default Credentials Chain: If none of the above methods provide credentials, the AWS SDK for JavaScript falls back to the default credential provider chain, which attempts to find credentials in the following order: environment variables, shared credentials file, IAM role assigned to the EC2 instance, and finally, container service credentials.
