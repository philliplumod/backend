import { Body, Controller, Get, HttpException, HttpStatus, Post, Put, Param } from '@nestjs/common';
import { MotorBrandService } from '../services/motor.brand.service';
import { MotorBrandDto } from '../dto/motor.brand.dto';
import { MotorBrand } from '../entities/motor.brand.entity';

@Controller('motor-brand')
export class MotorBrandController {
  constructor(private readonly motorBrandService: MotorBrandService) {}

  @Post('create')
  async createMotorBrand(
    @Body() createMotorBrandDto: MotorBrandDto,
  ): Promise<MotorBrand> {
    return this.motorBrandService.createMotorBrand(createMotorBrandDto);
  }

  @Get('brands')
  async getMotorBrands(): Promise<MotorBrand[] | { message: string }> {
    try {
      const brands = await this.motorBrandService.getMotorBrands();
      if (brands.length === 0) {
        return { message: 'No motor brands found' };
      }
      return brands;
    } catch (error) {
      throw new HttpException(
        'Failed to get motor brands',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // New PUT method for updating a motor brand
  @Put('update/:id')
  async updateMotorBrand(
    @Param('id') brand_id: string,
    @Body() updateMotorBrandDto: MotorBrandDto,
  ): Promise<MotorBrand> {
    return this.motorBrandService.updateMotorBrand(brand_id, updateMotorBrandDto);
  }
}
