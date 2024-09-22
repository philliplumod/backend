import { Module } from '@nestjs/common';
import { MotorService } from './motor.service';
import { MotorController } from './motor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Motor } from './entities/motor.entity';
import { MotorBrand } from './entities/motor.brand.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Motor, MotorBrand])],
  providers: [MotorService],
  controllers: [MotorController],
})
export class MotorModule {}
