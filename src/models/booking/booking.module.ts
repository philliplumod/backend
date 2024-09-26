import { Module } from '@nestjs/common';
import { BookingController } from './controllers/booking.controller';
import { BookingService } from './services/booking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Motor } from '../motor/entities/motor.entity';
import { User } from '../user/entities/user.entity';
import { Booking } from './entities/booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Motor, User, Booking])],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
