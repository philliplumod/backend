import { Body, Controller, Get, Post } from '@nestjs/common';
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
  async getMotors(): Promise<Motor[]> {
    return this.motorService.getMotors();
  }
}
