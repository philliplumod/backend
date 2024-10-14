import { Injectable, NotFoundException } from '@nestjs/common';
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

  // Create a booking
  async createBooking(bookingDto: BookingDto): Promise<Booking> {
    const {
      user_id,
      motor_id,
      booking_date,
      return_date,
      booking_status,
      message,
    } = bookingDto;

    // Check if user exists
    const user = await this.userRepository.findOne({ where: { user_id } });
    if (!user) {
      throw new NotFoundException(`User with ID "${user_id}" not found.`);
    }

    // Check if motor exists
    const motor = await this.motorRepository.findOne({ where: { motor_id } });
    if (!motor) {
      throw new NotFoundException(`Motor with ID "${motor_id}" not found.`);
    }

    const newBooking = this.bookingRepository.create({
      user,
      motor,
      booking_date,
      return_date,
      booking_status,
      message,
    });

    return this.bookingRepository.save(newBooking);
  }

  // Get all bookings (for admin)
  async getAllBookings(): Promise<Booking[]> {
    return this.bookingRepository.find({
      relations: ['user', 'motor'],
    });
  }

  // Get bookings by user (optional)
  async getBookingsByUser(userId: string): Promise<Booking[]> {
    return this.bookingRepository.find({
      where: { user: { user_id: userId } },
      relations: ['motor'],
    });
  }
}
