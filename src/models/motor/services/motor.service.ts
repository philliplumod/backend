import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Motor } from '../entities/motor.entity';
import { MotorDto } from '../dto/motor.dto';
import { MotorBrand } from '../entities/motor.brand.entity';

@Injectable()
export class MotorService {
  constructor(
    @InjectRepository(Motor)
    private readonly motorRepository: Repository<Motor>,
    @InjectRepository(MotorBrand)
    private readonly motorBrandRepository: Repository<MotorBrand>,
  ) {}

  async createMotor(motorDto: MotorDto): Promise<Motor> {
    const { brand_id, color, plate_no, price, model, description } = motorDto;

    // Check if a motor with the same plate_no already exists
    const existingMotor = await this.motorRepository.findOne({
      where: { plate_no },
    });
    if (existingMotor) {
      throw new ConflictException(
        `Motor with plate number "${plate_no}" already exists.`,
      );
    }

    // Find the motor brand using brand_id
    const motorBrand = await this.motorBrandRepository.findOne({
      where: { brand_id },
    });
    if (!motorBrand) {
      throw new NotFoundException(
        `Motor brand with ID "${brand_id}" not found.`,
      );
    }

    const newMotor = this.motorRepository.create({
      color,
      plate_no,
      price,
      model,
      motorBrand,
      description,
    });

    return this.motorRepository.save(newMotor);
  }

  async getMotors(): Promise<Motor[]> {
    return this.motorRepository.find({ relations: ['motorBrand'] });
  }

  async bulkCreateMotors(
    motorDtos: MotorDto[],
  ): Promise<{ message: string; motors: Motor[] }> {
    const motorsToCreate: Motor[] = [];
    const plateNumbers: string[] = [];

    for (const motorDto of motorDtos) {
      // Check if a motor with the same plate_no already exists
      const existingMotor = await this.motorRepository.findOne({
        where: { plate_no: motorDto.plate_no },
      });
      if (existingMotor) {
        throw new ConflictException(
          `Motor with plate number "${motorDto.plate_no}" already exists.`,
        );
      }

      // Find the motor brand using brand_id
      const motorBrand = await this.motorBrandRepository.findOne({
        where: { brand_id: motorDto.brand_id },
      });
      if (!motorBrand) {
        throw new NotFoundException(
          `Motor brand with ID "${motorDto.brand_id}" not found.`,
        );
      }

      const newMotor = this.motorRepository.create({
        color: motorDto.color,
        plate_no: motorDto.plate_no,
        price: motorDto.price,
        model: motorDto.model,
        motorBrand,
        description: motorDto.description,
      });

      motorsToCreate.push(newMotor);
      plateNumbers.push(motorDto.plate_no);
    }

    const savedMotors = await this.motorRepository.save(motorsToCreate);
    return { message: 'Motors created successfully', motors: savedMotors };
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

      motor.motorBrand = motorBrand; // Update the motor's brand
    }

    // Merge the rest of the fields
    Object.assign(motor, updateMotorDto);
    return this.motorRepository.save(motor); // Save the updated motor
  }
}
