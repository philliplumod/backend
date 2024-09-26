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

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  // Route for admin to fetch all bookings
  @Get('all')
  async getAllBookings(): Promise<Booking[]> {
    const bookings = await this.bookingService.getAllBookings();
    if (bookings.length === 0) {
      throw new HttpException('No bookings found', HttpStatus.NOT_FOUND);
    }
    return bookings;
  }

  // Route for users to create a booking
  @Post('create')
  async createBooking(@Body() bookingDto: BookingDto): Promise<Booking> {
    return this.bookingService.createBooking(bookingDto);
  }

  // Optional: Route to get a specific user's bookings
  @Get('user/:id')
  async getBookingsByUser(@Param('id') userId: string): Promise<Booking[]> {
    return this.bookingService.getBookingsByUser(userId);
  }
}
