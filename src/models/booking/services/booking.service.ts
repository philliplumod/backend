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

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Motor)
    private readonly motorRepository: Repository<Motor>,
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
    try {
      return await this.bookingRepository.find({
        relations: ['motor', 'user'],
      });
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw new HttpException(
        'Error fetching bookings',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateBooking(
    booking_id: string,
    bookingDto: BookingDto,
  ): Promise<Booking> {
    const book = await this.bookingRepository.findOne({
      where: { booking_id },
    });

    if (!book) {
      throw new NotFoundException('Booking not found');
    }

    Object.assign(book, bookingDto);

    return await this.bookingRepository.save(book);
  }
}
