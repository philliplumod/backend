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
import { MotorService } from '../services/motor.service';
import { MotorDto } from '../dto/motor.dto';
import { Motor } from '../entities/motor.entity';

@Controller('motor')
export class MotorController {
  constructor(private readonly motorService: MotorService) {}

  @Post('create')
  async createMotor(@Body() motorDto: MotorDto): Promise<Motor> {
    return this.motorService.createMotor(motorDto);
  }

  @Get('motors')
  async getMotors(): Promise<{ message: string; motors: Motor[] }> {
    try {
      const motors = await this.motorService.getMotors();
      if (motors.length === 0) {
        return { message: 'Motors Found', motors: [] };
      }
      return {
        message: `Motors retrieved successfully: ${motors.length}`,
        motors,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve motors',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('bulk-create')
  async bulkCreateMotors(
    @Body() motorDtos: MotorDto[],
  ): Promise<{ message: string; motors: Motor[] }> {
    return this.motorService.bulkCreateMotors(motorDtos);
  }

  @Put(':id')
  async updateMotor(
    @Body() updateMotorDto: MotorDto,
    @Param('id') id: string,
  ): Promise<Motor> {
    return this.motorService.updateMotor(id, updateMotorDto);
  }
}
