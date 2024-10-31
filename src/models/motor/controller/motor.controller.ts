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
} from '@nestjs/common';
import { MotorService } from '../services/motor.service';
import { MotorDto } from '../dto/motor.dto';
import { Motor } from '../entities/motor.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('motor')
@Controller('motor')
export class MotorController {
  constructor(private readonly motorService: MotorService) {}

  @Post('create')
  async createMotor(@Body() motorDto: MotorDto): Promise<Motor> {
    return this.motorService.createMotor(motorDto);
  }

  @Get()
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

  @Get(':id')
  async getMotorById(@Param('id') id: string): Promise<Motor> {
    try {
      return this.motorService.getMotorById(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error fetching motor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put('update/:id')
  async updateMotor(
    @Body() updateMotorDto: MotorDto,
    @Param('id') id: string,
  ): Promise<Motor> {
    return this.motorService.updateMotor(id, updateMotorDto);
  }

  @Get('visible')
  async getVisibleMotors(): Promise<{ message: string; motors: Motor[] }> {
    const motors = await this.motorService.getVisibleMotors();
    return {
      message: `Visible motors retrieved successfully: ${motors.length}`,
      motors,
    };
  }

  @Delete('delete/:id')
  async deleteMotor(@Param('id') id: string): Promise<{ message: string }> {
    return this.motorService.deleteMotor(id);
  }

  @Get('archived')
  async getArchivedMotors(): Promise<{ motors: Motor[] }> {
    return { motors: await this.motorService.getArchivedMotors() };
  }
}
