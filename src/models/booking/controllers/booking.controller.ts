import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BookingDto } from '../dto/booking.dto';
import { Booking } from '../entities/booking.entity';
import { BookingService } from '../services/booking.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('booking')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post('book')
  async createBooking(@Body() bookingDto: BookingDto): Promise<Booking> {
    try {
      return this.bookingService.createBooking(bookingDto);
    } catch (error) {
      console.error('Error in createBooking:', error);
      throw new HttpException(
        error.message || 'Error creating booking',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
