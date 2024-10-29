import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { MotorBrand } from '../entities/motor.brand.entity';
import { Repository } from 'typeorm';
import { MotorBrandDto } from '../dto/motor.brand.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MotorBrandService {
  constructor(
    @InjectRepository(MotorBrand)
    private readonly motorBrandRepository: Repository<MotorBrand>,
  ) {}

  async doesBrandExist(brand_name: string): Promise<boolean> {
    const brand = await this.motorBrandRepository.findOne({
      where: { brand_name },
    });
    return !!brand;
  }

  getMotorBrands(): Promise<MotorBrand[]> {
    return this.motorBrandRepository.find();
  }

  async getMotorBrandById(brand_id: string): Promise<MotorBrand> {
    const brand = await this.motorBrandRepository.findOne({
      where: { brand_id },
    });
    if (!brand) {
      throw new NotFoundException(
        `Motor brand with ID "${brand_id}" not found.`,
      );
    }
    return brand;
  }

  async createMotorBrand(
    createMotorBrandDto: MotorBrandDto,
  ): Promise<MotorBrand> {
    const { brand_name } = createMotorBrandDto;

    // Check if the brand already exists
    const brandExists = await this.doesBrandExist(brand_name);
    if (brandExists) {
      throw new ConflictException(
        `Motor brand "${brand_name}" already exists.`,
      );
    }

    // Create and save new brand if it doesn't exist
    const newBrand = this.motorBrandRepository.create(createMotorBrandDto);
    return this.motorBrandRepository.save(newBrand);
  }

  // New method for updating motor brand
  async updateMotorBrand(
    brand_id: string,
    updateMotorBrandDto: MotorBrandDto,
  ): Promise<MotorBrand> {
    const { brand_name } = updateMotorBrandDto;

    // Check if the motor brand to be updated exists
    const motorBrand = await this.motorBrandRepository.findOne({
      where: { brand_id },
    });
    if (!motorBrand) {
      throw new NotFoundException(
        `Motor brand with ID "${brand_id}" not found.`,
      );
    }

    // If the brand name is the same as the current one, skip the conflict check
    if (motorBrand.brand_name !== brand_name) {
      const brandExists = await this.doesBrandExist(brand_name);
      if (brandExists) {
        throw new ConflictException(
          `Motor brand "${brand_name}" already exists.`,
        );
      }
    }

    // Update the brand name
    motorBrand.brand_name = brand_name;

    return this.motorBrandRepository.save(motorBrand);
  }
}
