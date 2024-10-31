import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Motor } from '../entities/motor.entity';
import { MotorDto } from '../dto/motor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MotorCategory } from '../entities/motor.category.entity';

@Injectable()
export class MotorService {
  constructor(
    @InjectRepository(Motor)
    private readonly motorRepository: Repository<Motor>,
    @InjectRepository(MotorCategory)
    private readonly motorCategory: Repository<MotorCategory>,
  ) {}

  async createMotor(motorDto: MotorDto): Promise<Motor> {
    const { plate_no, category_id } = motorDto;

    const [existingMotor, motorCategory] = await Promise.all([
      this.motorRepository.findOne({ where: { plate_no } }),
      this.motorCategory.findOne({ where: { category_id } }),
    ]);

    if (existingMotor) {
      throw new ConflictException(
        `Motor with plate number "${plate_no}" already exists.`,
      );
    }

    if (!motorCategory) {
      throw new NotFoundException(
        `Motor Category with ID "${category_id}" not found.`,
      );
    }

    // Create and save new motor
    return this.motorRepository.save(
      this.motorRepository.create({ ...motorDto, motorCategory }),
    );
  }

  async getMotors(): Promise<Motor[]> {
    return this.motorRepository.find({
      where: { isDelete: false },
      relations: ['motorCategory'],
    });
  }

  async updateMotor(
    motor_id: string,
    updateMotorDto: MotorDto,
  ): Promise<Motor> {
    const motor = await this.motorRepository.findOne({
      where: { motor_id },
      relations: ['motorCategory'],
    });

    if (!motor) {
      throw new NotFoundException(`Motor with ID ${motor_id} not found`);
    }

    if (updateMotorDto.category_id) {
      const motorCategory = await this.motorCategory.findOne({
        where: { category_id: updateMotorDto.category_id },
      });

      if (!motorCategory) {
        throw new NotFoundException(
          `MotorCategory with ID ${updateMotorDto.category_id} not found`,
        );
      }

      motor.motorCategory = motorCategory;
    }

    // Merge the rest of the fields
    Object.assign(motor, updateMotorDto);
    return this.motorRepository.save(motor);
  }

  async getVisibleMotors(): Promise<Motor[]> {
    return this.motorRepository.find({
      where: { isVisible: true },
      relations: ['motorCategory'],
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
      relations: ['motorCategory'],
    });
  }

  async getMotorById(motor_id: string): Promise<Motor> {
    const motor = await this.motorRepository.findOne({
      where: { motor_id },
      relations: ['motorCategory'],
    });

    if (!motor) {
      throw new NotFoundException(`Motor with ID ${motor_id} not found`);
    }

    return motor;
  }
}
