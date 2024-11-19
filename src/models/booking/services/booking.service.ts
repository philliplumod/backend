import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Motor } from '../../motor/entities/motor.entity';
import { User } from '../../user/entities/user.entity';
import { BookingDto } from '../dto/booking.dto';
import { Booking } from '../entities/booking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ReturnStatus } from '../dto/return.booking.dto';
import { HttpService } from '@nestjs/axios';

import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Motor)
    private readonly motorRepository: Repository<Motor>,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async createBooking(bookingDto: BookingDto): Promise<Booking> {
    try {
      const motor = await this.motorRepository.findOne({
        where: { motor_id: bookingDto.motor_id },
      });
      if (!motor) {
        throw new NotFoundException('Motor not found');
      }

      const user = await this.userRepository.findOne({
        where: { user_id: bookingDto.user_id },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const createBooking = this.bookingRepository.create({
        ...bookingDto,
        motor,
        user,
        is_rent: false,
      });
      return await this.bookingRepository.save(createBooking);
    } catch (error) {
      console.error('Booking creation error:', error);
      throw new HttpException(
        'Error creating booking',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllBookings(): Promise<Booking[]> {
    const bookings = await this.bookingRepository.find({
      relations: ['motor', 'motor.motorCategory', 'user'],
    });
    if (bookings.length === 0) {
      throw new NotFoundException('No bookings found');
    }
    return bookings;
  }

  async getBookingById(booking_id: string): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({
      where: { booking_id },
      relations:  ['motor', 'motor.motorCategory', 'user']
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    return booking;
  }

  async updateBooking(
    booking_id: string,
    bookingDto: BookingDto,
  ): Promise<Booking> {
    const book = await this.bookingRepository.findOne({
      where: { booking_id },
      relations: ['motor', 'user'],
    });

    if (!book) {
      throw new NotFoundException('Booking not found');
    }

    Object.assign(book, bookingDto);

    await this.bookingRepository.save(book);

    return await this.bookingRepository.findOne({
      where: { booking_id },
      relations: ['motor', 'user'],
    });
  }

  async updateReturnStatus(
    booking_id: string,
    returnStatus: ReturnStatus,
  ): Promise<Booking> {
    const book = await this.bookingRepository.findOne({
      where: { booking_id },
      relations: ['motor', 'user'],
    });

    if (!book) {
      throw new NotFoundException('Booking not found');
    }

    if (returnStatus.return_status !== undefined) {
      book.return_status = returnStatus.return_status;
    }

    await this.bookingRepository.save(book);

    return await this.bookingRepository.findOne({
      where: { booking_id },

      relations: ['motor', 'user'],
    });
  }
  // async approveBooking(booking_id: string): Promise<Booking> {
  //   return booking;
  // }
}
