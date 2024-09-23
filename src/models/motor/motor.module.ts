import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MotorBrand } from './entities/motor.brand.entity';
import { MotorBrandService } from './services/motor.brand.service';
import { MotorBrandController } from './controller/motor.brand.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MotorBrand])], // Register User entity
  providers: [MotorBrandService],
  controllers: [MotorBrandController],
})
export class MotorModule {}
