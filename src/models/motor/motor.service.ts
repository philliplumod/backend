import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Motor } from './entities/motor.entity';
import { CreateMotorDto } from './dto/motor.dto';

@Injectable()
export class MotorService {
  constructor(
    @InjectRepository(Motor)
    private readonly motorRepository: Repository<Motor>,
  ) {}

  async getMotor(): Promise<Motor[]> {
    return this.motorRepository.find({});
  }

  findVisibleMotors(): Promise<Motor[]> {
    return this.motorRepository.find({ where: { isVisible: true } });
  }
  async findMotorByBrandAndModel(
    brand_name: string,
    model: string,
  ): Promise<Motor> {
    return this.motorRepository.findOne({ where: { brand_name, model } });
  }

  async createMotor(createMotorDto: CreateMotorDto): Promise<Motor> {
    const motor = this.motorRepository.create(createMotorDto);
    return this.motorRepository.save(motor);
  }

  async deleteMotor(motor_id: string): Promise<void> {
    await this.motorRepository.delete({ motor_id });
  }

  async updateMotor(
    motor_id: string,
    updateMotorDto: CreateMotorDto,
  ): Promise<Motor> {
    const motor = await this.motorRepository.findOne({
      where: { motor_id },
    });

    if (!motor) {
      throw new NotFoundException(`Motor with id ${motor_id} not found`);
    }

    // Update motor properties
    Object.assign(motor, updateMotorDto);

    try {
      // Save the updated motor
      const updatedMotor = await this.motorRepository.save(motor);
      return updatedMotor;
    } catch (error) {
      console.error('Failed to update motor:', error);
      throw new InternalServerErrorException('Failed to update motor');
    }
  }
}
