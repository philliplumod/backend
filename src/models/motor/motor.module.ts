import { Module } from '@nestjs/common';
import { MotorService } from './motor.service';
import { MotorController } from './motor.controller';

@Module({
  providers: [MotorService],
  controllers: [MotorController]
})
export class MotorModule {}
