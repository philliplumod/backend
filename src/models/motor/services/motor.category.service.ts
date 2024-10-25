import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MotorCategory } from '../entities/motor.category.entity';
import { Repository } from 'typeorm';
import { MotorCategoryDto } from '../dto/motor.category.dto';

@Injectable()
export class MotorCategoryService {
  constructor(
    @InjectRepository(MotorCategory)
    private readonly motorCategoryRepository: Repository<MotorCategory>,
  ) {}

  async createMotorCategory(
    createMotorCategory: MotorCategoryDto,
  ): Promise<MotorCategory> {
    const { category_name } = createMotorCategory;

    // Check if the category already exists
    const categoryExists = await this.doesCategoryExist(category_name);
    if (categoryExists) {
      throw new ConflictException(
        `Motor category "${category_name}" already exists.`,
      );
    }
    // Create and save new category if it doesn't exist
    const newCategory =
      this.motorCategoryRepository.create(createMotorCategory);
    return this.motorCategoryRepository.save(newCategory);
  }

  doesCategoryExist(category_name: string): Promise<boolean> {
    return this.motorCategoryRepository
      .findOne({
        where: { category_name },
      })
      .then((category) => !!category);
  }
}
