import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
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
  @Get('categories')
  async getMotorCategories(): Promise<MotorCategory[] | { message: string }> {
    try {
      const categories = await this.motorCategoryService.getMotorCategories();
      if (categories.length === 0) {
        return { message: 'No motor categories found' };
      }
      return categories;
    } catch (error) {
      throw new HttpException(
        'Failed to get motor brands',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put('update/:id')
  async updateMotorCategory(
    @Param('id') category_id: string,
    @Body() updateMotorCategoryDto: MotorCategoryDto,
  ): Promise<MotorCategory> {
    return this.motorCategoryService.updateMotorCategory(
      category_id,
      updateMotorCategoryDto,
    );
  }
}
