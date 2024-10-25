import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MotorCategoryService } from '../services/motor.category.service';
import { MotorCategoryDto } from '../dto/motor.category.dto';
import { MotorCategory } from '../entities/motor.category.entity';

@ApiTags('motor-category')
@Controller('motor-category')
export class MotorCategoryController {
  constructor(private readonly motorCategoryService: MotorCategoryService) {}

  @Post('create')
  async createMotorCategory(
    @Body() createMotorCategoryDto: MotorCategoryDto,
  ): Promise<MotorCategory> {
    return this.motorCategoryService.createMotorCategory(
      createMotorCategoryDto,
    );
  }
}
