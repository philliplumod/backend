import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // No path here, so it handles root routes
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getRoot(): string {
    return 'Welcome to the Motorcycle Rental API';
  }

  @Get('/products')
  getProducts(): string {
    return this.appService.getHello();
  }
}
