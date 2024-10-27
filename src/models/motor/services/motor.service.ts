import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Motor } from '../entities/motor.entity';
import { MotorDto } from '../dto/motor.dto';
import { MotorBrand } from '../entities/motor.brand.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MotorService {
  constructor(
    @InjectRepository(Motor)
    private readonly motorRepository: Repository<Motor>,
    @InjectRepository(MotorBrand)
    private readonly motorBrandRepository: Repository<MotorBrand>,
  ) {}

  async createMotor(motorDto: MotorDto): Promise<Motor> {
    const { plate_no, brand_id } = motorDto;

    // Check for existing motor and motor brand
    const [existingMotor, motorBrand] = await Promise.all([
      this.motorRepository.findOne({ where: { plate_no } }),
      this.motorBrandRepository.findOne({ where: { brand_id } }),
    ]);

    if (existingMotor) {
      throw new ConflictException(
        `Motor with plate number "${plate_no}" already exists.`,
      );
    }

    if (!motorBrand) {
      throw new NotFoundException(
        `Motor brand with ID "${brand_id}" not found.`,
      );
    }

    // Create and save new motor
    return this.motorRepository.save(
      this.motorRepository.create({ ...motorDto, motorBrand }),
    );
  }

  async getMotors(): Promise<Motor[]> {
    return this.motorRepository.find({
      where: { isDelete: false },
      relations: ['motorBrand'],
    });
  }

  async updateMotor(
    motor_id: string,
    updateMotorDto: MotorDto,
  ): Promise<Motor> {
    const motor = await this.motorRepository.findOne({
      where: { motor_id },
      relations: ['motorBrand'],
    });

    if (!motor) {
      throw new NotFoundException(`Motor with ID ${motor_id} not found`);
    }

    // If brand_id is provided, fetch the MotorBrand entity
    if (updateMotorDto.brand_id) {
      const motorBrand = await this.motorBrandRepository.findOne({
        where: { brand_id: updateMotorDto.brand_id },
      });

      if (!motorBrand) {
        throw new NotFoundException(
          `MotorBrand with ID ${updateMotorDto.brand_id} not found`,
        );
      }

      motor.motorBrand = motorBrand; 
    }

    // Merge the rest of the fields
    Object.assign(motor, updateMotorDto);
    return this.motorRepository.save(motor); 
  }

  async getVisibleMotors(): Promise<Motor[]> {
    return this.motorRepository.find({
      where: { isVisible: true },
      relations: ['motorBrand'],
    });
  }

  async deleteMotor(motor_id: string): Promise<{ message: string }> {
    const motor = await this.motorRepository.findOne({ where: { motor_id } });

    if (!motor) {
      throw new NotFoundException(`Motor with ID ${motor_id} not found`);
    }

    motor.isDelete = true; 
    await this.motorRepository.save(motor); 

    return { message: 'Motor archived successfully' };
  }

  async getArchivedMotors(): Promise<Motor[]> {
    return this.motorRepository.find({
      where: { isDelete: true }, // Get only archived motors
      relations: ['motorBrand'],
    });
  }
}
