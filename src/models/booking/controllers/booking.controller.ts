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
  Patch,
} from '@nestjs/common';
import { BookingDto } from '../dto/booking.dto';
import { Booking } from '../entities/booking.entity';
import {
  BookingService,
  RentStatus,
  SendEmailDTO,
} from '../services/booking.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReturnStatus } from '../dto/return.booking.dto';
import { PaymentDto } from '../dto/date.payment.dto';

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
  @Put(':id/approve')
  async approveBooking(
    @Param('id') booking_id: string,
    @Body() dto: SendEmailDTO,
  ): Promise<Booking> {
    return this.bookingService.approveBooking(booking_id, dto);
  }

  @Put(':id/decline')
  async declineBooking(
    @Param('id') booking_id: string,
    @Body() dto: SendEmailDTO,
  ): Promise<Booking> {
    return this.bookingService.declineBooking(booking_id, dto);
  }

  @Put(':id/date-of-payment')
  async addPayment(
    @Param('id') booking_id: string,
    @Body() paymentDto: PaymentDto,
  ): Promise<Booking> {
    return this.bookingService.addPayment(booking_id, paymentDto);
  }

  @Put(':id/rent')
  async isRent(@Param('id') booking_id: string): Promise<Booking> {
    return this.bookingService.isRent(booking_id);
  }

  @Get('sales-report')
  async getSalesReport() {
    return await this.bookingService.getSalesReport();
  }

  @Get('pending-bookings/count')
  async getPendingBookingsCount(): Promise<number> {
    return this.bookingService.getPendingBookingsCount();
  }

  @Get('is-rent-true/count')
  async getStatusRentTrue(): Promise<number> {
    return this.bookingService.getStatusRentTrue();
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
}
