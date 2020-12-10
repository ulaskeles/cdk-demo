import { APIGatewayProxyResult } from 'aws-lambda'
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): APIGatewayProxyResult {
    return this.appService.getHello();
  }
}
