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
      motorBrand, // associate the motor with the brand
      description,
    });

    return this.motorRepository.save(newMotor);
  }

  x;
}
