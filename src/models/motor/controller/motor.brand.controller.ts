import { Body, Controller, Get, HttpException, HttpStatus, Post, Req } from '@nestjs/common';
import { MotorBrandService } from '../services/motor.brand.service';
import { MotorBrandDto } from '../dto/motor.brand.dto';
import { request } from 'http';

@Controller('motor-brand')
export class MotorBrandController {
  constructor(private readonly motorBrandService: MotorBrandService) {}

  @Post('create')
  async createMotorBrand(
    @Body() createMotorBrandDto: MotorBrandDto,
  ): Promise<any> {
    return this.motorBrandService.createMotorBrand(createMotorBrandDto);
  }

  @Get('brands')
    async getMotorBrands(@Req() request: Request): Promise<any> {
      try {
        const brands = await this.motorBrandService.getMotorBrands();
        if (brands.length === 0) {
          return { message: 'No motor brands found' };
        }
        return brands;
      } catch (error) {
        throw new HttpException(
          'Failed to get motor brands',
          HttpStatus.INTERNAL_SERVER_ERROR);
      }
        // return this.motorBrandService.getMotorBrands();
    }
}
