import { Module } from '@nestjs/common';
import { MotorBrand } from './entities/motor.brand.entity';
import { MotorBrandService } from './services/motor.brand.service';
import { MotorBrandController } from './controller/motor.brand.controller';
import { Motor } from './entities/motor.entity';
import { MotorController } from './controller/motor.controller';
import { MotorService } from './services/motor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MotorCategory } from './entities/motor.category.entity';
import { MotorCategoryService } from './services/motor.category.service';
import { MotorCategoryController } from './controller/motor.category.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MotorBrand, Motor, MotorCategory])],
  providers: [MotorBrandService, MotorService, MotorCategoryService],
  controllers: [MotorBrandController, MotorController, MotorCategoryController],
})
export class MotorModule {}
