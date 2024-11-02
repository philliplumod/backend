import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    const newCategory = this.motorCategoryRepository.create({
      ...createMotorCategory,
      isArchived: false,
    });
    return this.motorCategoryRepository.save(newCategory);
  }

  async doesCategoryExist(category_name: string): Promise<boolean> {
    return this.motorCategoryRepository
      .findOne({
        where: { category_name },
      })
      .then((category) => !!category);
  }

  async getMotorCategories(): Promise<MotorCategory[]> {
    return this.motorCategoryRepository.find();
  }

  async deleteCategory(category_id: string): Promise<{ message: string }> {
    const category = await this.motorCategoryRepository.findOne({
      where: { category_id },
    });
    if (!category) {
      throw new NotFoundException(
        `Motor category with ID "${category_id}" not found.`,
      );
    }
    category.isArchived = true;
    await this.motorCategoryRepository.save(category);

    return { message: `Motor category with ID "${category_id}" deleted.` };
  }

  async updateMotorCategory(
    category_id: string,
    updateMotorCategoryDto: MotorCategoryDto,
  ): Promise<MotorCategory> {
    const { category_name } = updateMotorCategoryDto;

    // Check if the motor category to be updated exists
    const motorCategory = await this.motorCategoryRepository.findOne({
      where: { category_id },
    });
    if (!motorCategory) {
      throw new NotFoundException(
        `Motor category with ID "${category_id}" not found.`,
      );
    }

    if (motorCategory.category_name === category_name) {
      const categoryExists = await this.doesCategoryExist(category_name);
      if (categoryExists) {
        throw new ConflictException(
          `Motor category "${category_name}" already exists.`,
        );
      }
    }

    // Update the motor category
    motorCategory.category_name = category_name;
    return this.motorCategoryRepository.save(motorCategory);
  }
}
