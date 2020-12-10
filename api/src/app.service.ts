import { Injectable } from '@nestjs/common';
import { APIGatewayProxyResult } from 'aws-lambda'

@Injectable()
export class AppService {
  getHello(): APIGatewayProxyResult {
    // return 'Hello World!';
    return {
      // "cookies" : ["cookie1", "cookie2"],
      "isBase64Encoded": false,
      "statusCode": 200,
      "headers": { "Access-Control-Allow-Origin": "*" },
      "body": "Hello from Lambda!"
    }
  }
}
