import { Module } from '@nestjs/common';
import { Motor } from './entities/motor.entity';
import { MotorController } from './controller/motor.controller';
import { MotorService } from './services/motor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MotorCategory } from './entities/motor.category.entity';
import { MotorCategoryService } from './services/motor.category.service';
import { MotorCategoryController } from './controller/motor.category.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Motor, MotorCategory])],
  providers: [MotorService, MotorCategoryService],
  controllers: [MotorController, MotorCategoryController],
})
export class MotorModule {}
