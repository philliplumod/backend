import { Injectable, ConflictException } from '@nestjs/common';
import { MotorBrand } from '../entities/motor.brand.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MotorBrandDto } from '../dto/motor.brand.dto';

@Injectable()
export class MotorBrandService {
  constructor(
    @InjectRepository(MotorBrand)
    private readonly motorBrandRepository: Repository<MotorBrand>,
  ) {}

  async isBrandExist(brand_name: string): Promise<boolean> {
    const brand = await this.motorBrandRepository.findOne({
      where: { brand_name },
    });
    return !!brand;
  }

  async createMotorBrand(
    createMotorBrandDto: MotorBrandDto,
  ): Promise<MotorBrand> {
    const { brand_name } = createMotorBrandDto;

    // Check if the brand already exists
    const brandExists = await this.isBrandExist(brand_name);
    if (brandExists) {
      throw new ConflictException(
        `Motor brand "${brand_name}" already exists.`,
      );
    }

    // Create and save new brand if it doesn't exist
    const newBrand = this.motorBrandRepository.create(createMotorBrandDto);
    return this.motorBrandRepository.save(newBrand);
  }
}
