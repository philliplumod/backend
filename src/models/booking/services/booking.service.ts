import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Between, Repository } from 'typeorm';
import { Motor } from '../../motor/entities/motor.entity';
import { User } from '../../user/entities/user.entity';
import { BookingDto } from '../dto/booking.dto';
import { Booking } from '../entities/booking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ReturnStatus } from '../dto/return.booking.dto';

import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { Address } from '@nestjs-modules/mailer/dist/interfaces/send-mail-options.interface';
import { PaymentDto } from '../dto/date.payment.dto';

export type SendEmailDTO = {
  sender?: string | Address;
  recipient: Address[];
  subject: string;
};

export type RentStatus = {
  is_rent: boolean;
};

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
  async approveBooking(
    booking_id: string,
    dto: SendEmailDTO,
  ): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({
      where: { booking_id },
      relations: ['motor', 'user'],
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    const { sender, subject, recipient = [] } = dto;
    const finalRecipient =
      recipient.length > 0
        ? recipient
        : [{ name: booking.user.first_name, address: booking.user.email }];

    await this.mailerService.sendMail({
      from: sender || this.configService.get<string>('MAIL_FROM'),
      to: finalRecipient,
      subject: subject || 'Booking Approved',
      text: `Hello ${booking.user.first_name}, your booking for the motorcycle ${booking.motor.model} has been approved.`,
    });

    booking.is_approve = true;
    booking.booking_status = 'Approved';
    booking.date_of_payment = '0000:00:00';

    await this.bookingRepository.save(booking);

    return booking;
  }

  async isRent(booking_id: string): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({
      where: { booking_id },
      relations: ['motor', 'user'],
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    booking.is_rent = true;

    await this.bookingRepository.save(booking);

    return booking;
  }
  async declineBooking(
    booking_id: string,
    dto: SendEmailDTO,
  ): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({
      where: { booking_id },
      relations: ['motor', 'user'],
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    const { sender, subject, recipient = [] } = dto;
    const finalRecipient =
      recipient.length > 0
        ? recipient
        : [{ name: booking.user.first_name, address: booking.user.email }];

    await this.mailerService.sendMail({
      from: sender || this.configService.get<string>('MAIL_FROM'),
      to: finalRecipient,
      subject: subject || 'Booking Declined',
      text: `Hello ${booking.user.first_name}, your booking for the motorcycle ${booking.motor.model} has been declined.`,
    });

    booking.is_decline = true;
    booking.booking_status = 'Declined';
    booking.return_status = 'Returned';

    await this.bookingRepository.save(booking);

    return booking;
  }

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

      const validPaymentMethods = ['cash', 'Gcash e-Wallet'];
      const paymentMethod = validPaymentMethods.includes(
        bookingDto.payment_method,
      )
        ? bookingDto.payment_method
        : 'cash';

      const createBooking = this.bookingRepository.create({
        ...bookingDto,
        motor,
        user,
        is_rent: false,
        is_decline: false,
        is_approve: false,
        booking_status: 'Pending',
        payment_method: paymentMethod,
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
      relations: ['motor', 'motor.motorCategory', 'user'],
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

    book.rental_status = 'Completed';

    await this.bookingRepository.save(book);

    return await this.bookingRepository.findOne({
      where: { booking_id },

      relations: ['motor', 'user'],
    });
  }
  async getSalesReport(): Promise<any> {
    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    const startOfWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - today.getDay(),
    );
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfYear = new Date(today.getFullYear(), 0, 1);

    const rentalsToday = await this.bookingRepository.count({
      where: {
        created_at: Between(startOfDay, today),
        is_rent: true,
      },
    });

    const rentalsThisWeek = await this.bookingRepository.count({
      where: {
        created_at: Between(startOfWeek, today),
        is_rent: true,
      },
    });

    const rentalsThisMonth = await this.bookingRepository.count({
      where: {
        created_at: Between(startOfMonth, today),
        is_rent: true,
      },
    });

    const cashPaymentsToday = await this.bookingRepository.count({
      where: {
        created_at: Between(startOfDay, today),
        payment_method: 'cash',
        is_rent: true,
      },
    });

    const GcasheWalletPaymentsToday = await this.bookingRepository.count({
      where: {
        created_at: Between(startOfDay, today),
        payment_method: 'Gcash e-Wallet',
        is_rent: true,
      },
    });

    const totalAmountTodayResult = await this.bookingRepository
      .createQueryBuilder('booking')
      .select('SUM(booking.total_amount)', 'sum')
      .where('booking.created_at BETWEEN :start AND :end', {
        start: startOfDay,
        end: today,
      })
      .andWhere('booking.is_rent = :is_rent', { is_rent: true })
      .getRawOne();

    const totalAmountMonthResult = await this.bookingRepository
      .createQueryBuilder('booking')
      .select('SUM(booking.total_amount)', 'sum')
      .where('booking.created_at BETWEEN :start AND :end', {
        start: startOfMonth,
        end: today,
      })
      .andWhere('booking.is_rent = :is_rent', { is_rent: true })
      .getRawOne();

    const totalAmountYearResult = await this.bookingRepository
      .createQueryBuilder('booking')
      .select('SUM(booking.total_amount)', 'sum')
      .where('booking.created_at BETWEEN :start AND :end', {
        start: startOfYear,
        end: today,
      })
      .andWhere('booking.is_rent = :is_rent', { is_rent: true })
      .getRawOne();

    const totalAmountToday = totalAmountTodayResult.sum || 0;
    const totalAmountMonth = totalAmountMonthResult.sum || 0;
    const totalAmountYear = totalAmountYearResult.sum || 0;

    return {
      rentalsToday,
      rentalsThisWeek,
      rentalsThisMonth,
      cashPaymentsToday,
      GcasheWalletPaymentsToday,
      totalAmountToday,
      totalAmountMonth,
      totalAmountYear,
    };
  }

  async addPayment(
    booking_id: string,
    paymentDto: PaymentDto,
  ): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({
      where: { booking_id },
      relations: ['motor', 'user'],
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    booking.payment_method = paymentDto.payment_method;
    booking.total_amount = paymentDto.total_amount;
    booking.date_of_payment = paymentDto.date_of_payment;
    booking.paid_status = 'PAID';

    await this.bookingRepository.save(booking);

    return booking;
  }

  async getPendingBookingsCount(): Promise<number> {
    const count = await this.bookingRepository.count({
      where: { booking_status: 'Pending' },
    });

    return count;
  }
  async getStatusRentTrue(): Promise<number> {
    const count = await this.bookingRepository.count({
      where: { is_rent: true },
    });

    return count;
  }

  async getPickupDateBookings(): Promise<
    {
      user: User;
      pickup_date: Date;
      is_decline: boolean;
      return_status: string;
    }[]
  > {
    const bookings = await this.bookingRepository.find({
      where: { is_rent: true },
      relations: ['user'],
    });

    const today = new Date();

    return bookings.map((booking) => {
      if (
        new Date(booking.pickup_date).toDateString() !== today.toDateString()
      ) {
        booking.is_decline = true;
        booking.return_status = 'Returned';
        this.bookingRepository.save(booking);
      }

      return {
        user: booking.user,
        pickup_date: new Date(booking.pickup_date),
        is_decline: booking.is_decline,
        return_status: booking.return_status,
      };
    });
  }
}
