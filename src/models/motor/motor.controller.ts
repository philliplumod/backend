import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { MotorService } from './motor.service';
import { CreateMotorDto } from './dto/motor.dto';
import { Motor } from './entities/motor.entity';

@Controller('motor')
export class MotorController {
  constructor(private readonly motorService: MotorService) {}

  @Get('motors')
  async getMotor(@Req() request: Request): Promise<any> {
    try {
      const users = await this.motorService.getMotor();
      if (users.length === 0) {
        return { message: 'No Motor found' };
      }
      return users;
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve motors: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('create-motor')
  async createMotor(@Body() createMotorDto: CreateMotorDto): Promise<Motor> {
    try {
      const existingMotor = await this.motorService.findMotorByBrandAndModel(
        createMotorDto.brand_name,
        createMotorDto.model,
      );
      if (existingMotor) {
        throw new HttpException(
          'Motor with the same brand and model already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      const motor = await this.motorService.createMotor(createMotorDto);
      return motor;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error; // Re-throw known HttpExceptions
      }
      console.error('Error creating motor:', error); // Log the error for debugging
      throw new HttpException(
        'Error creating motor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id/update')
  async updateMotor(
    @Param('id') id: string,
    @Body() updateMotorDto: any,
  ): Promise<any> {
    try {
      const updatedMotor = await this.motorService.updateMotor(
        id,
        updateMotorDto,
      );
      return updatedMotor;
    } catch (error) {
      throw new HttpException(
        'Failed to update motor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('visible')
  async getVisibleMotors(): Promise<any> {
    try {
      const visibleMotors = await this.motorService.findVisibleMotors();
      return visibleMotors;
    } catch (error) {
      console.error('Error fetching visible motors:', error);
      throw new HttpException(
        'Error fetching visible motors',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id/delete')
  async deleteMotor(@Param('id') id: string): Promise<any> {
    try {
      const deletedMotor = await this.motorService.deleteMotor(id);
      return deletedMotor;
    } catch (error) {
      throw new HttpException(
        'Failed to delete motor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
