import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  HttpException,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { BookingDto } from '../dto/booking.dto';
import { Booking } from '../entities/booking.entity';
import { BookingService } from '../services/booking.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('booking')
@ApiBearerAuth()
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

  @Get('bookings')
  async getAllBookings(): Promise<Booking[]> {
    try {
      return this.bookingService.getAllBookings();
    } catch (error) {
      console.error('Error in getAllBookings:', error);
      throw new HttpException(
        error.message || 'Error fetching bookings',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  
  @Put('book/:booking_id')
  async updateBooking(
    @Param('booking_id') booking_id: string,
    @Body() bookingDto: BookingDto,
  ): Promise<Booking> {
    try {
      return this.bookingService.updateBooking(booking_id, bookingDto);
    } catch (error) {
      console.error('Error in updateBooking:', error);
      throw new HttpException(
        error.message || 'Error updating booking',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
