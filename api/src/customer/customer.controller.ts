import { Controller, Get } from '@nestjs/common';

@Controller('customer')
export class CustomerController {
    @Get()
    getCustomers(): string {
      return 'This action returns all customers!';
    }
}
