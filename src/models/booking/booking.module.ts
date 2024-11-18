import { Module } from '@nestjs/common';
import { BookingController } from './controllers/booking.controller';
import { BookingService } from './services/booking.service';
import { Motor } from '../motor/entities/motor.entity';
import { User } from '../user/entities/user.entity';
import { Booking } from './entities/booking.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Motor, User, Booking]), HttpModule],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
