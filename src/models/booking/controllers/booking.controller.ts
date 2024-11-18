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
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReturnStatus } from '../dto/return.booking.dto';

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

  @Get(':id')
  async getBookingById(@Param('id') id: string): Promise<Booking> {
    try {
      return this.bookingService.getBookingById(id);
    } catch (error) {
      console.error('Error in getBookingById:', error);
      throw new HttpException(
        error.message || 'Error fetching booking',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
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
  @Put('return/:booking_id')
  async updateReturnStatus(
    @Param('booking_id') booking_id: string,
    @Body() returnStatus: ReturnStatus,
  ): Promise<Booking> {
    try {
      return await this.bookingService.updateReturnStatus(
        booking_id,
        returnStatus,
      );
    } catch (error) {
      console.error('Error in updateReturnStatus:', error);
      throw new HttpException(
        error.message || 'Error updating booking',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  
}
