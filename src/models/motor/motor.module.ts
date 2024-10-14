import { Module } from '@nestjs/common';
import { MotorBrand } from './entities/motor.brand.entity';
import { MotorBrandService } from './services/motor.brand.service';
import { MotorBrandController } from './controller/motor.brand.controller';
import { Motor } from './entities/motor.entity';
import { MotorController } from './controller/motor.controller';
import { MotorService } from './services/motor.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MotorBrand, Motor])],
  providers: [MotorBrandService, MotorService],
  controllers: [MotorBrandController, MotorController],
})
export class MotorModule {}
