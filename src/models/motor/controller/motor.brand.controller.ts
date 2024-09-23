import { Body, Controller, Post } from '@nestjs/common';
import { MotorBrandService } from '../services/motor.brand.service';
import { MotorBrandDto } from '../dto/motor.brand.dto';

@Controller('motor-brand')
export class MotorBrandController {
  constructor(private readonly motorBrandService: MotorBrandService) {}

  @Post('create')
  async createMotorBrand(
    @Body() createMotorBrandDto: MotorBrandDto,
  ): Promise<any> {
    return this.motorBrandService.createMotorBrand(createMotorBrandDto);
  }
}
