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
import { Notification } from '../dto/notifiction.interface';
import { Cron, CronExpression } from '@nestjs/schedule';

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
  private readonly PENALTY_AMOUNT = 50;

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
      subject: subject || 'Motorcycle Rental Booking Approved',
      text: `Dear ${booking.user.first_name} ${booking.user.last_name},
      
    We are pleased to inform you that your motorcycle rental booking has been approved. Below are the details of your reservation:

    Booking ID: ${booking.booking_id}
    Rental Period: ${booking.pickup_date} to ${booking.return_date}
    Motorcycle: ${booking.motor.model}
    License Plate: ${booking.motor.plate_no}
    Color: ${booking.motor.color}
    Accessories: Helmet - ${booking.motor.helmet_price}, Storage - ${booking.motor.storage_price}

    If you have any questions or need assistance, please feel free to contact us at 09638913583.

    Thank you for choosing us!

    Best regards,
    Motorcycle Rental
    `,
    });

    booking.is_approve = true;
    booking.booking_status = 'Approved';
    booking.is_rent = true;

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
    booking.motor.isVisible = true;

    await this.motorRepository.save(booking.motor);
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
      subject: subject || 'Subject: Motorcycle Rental Booking Declined',
      text: `Dear ${booking.user.first_name} ${booking.user.last_name},

 We regret to inform you that your motorcycle rental booking has been declined. Unfortunately, we are unable to process your reservation at this time.

If you have any questions or would like to discuss alternative options, please don't hesitate to contact us at 09638913583.

We appreciate your understanding and hope to serve you in the future.

Best regards,
Motorcycle Rental
      `,
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
    booking.paid_status = 'PAID';

    await this.bookingRepository.save(booking);

    return booking;
  }

  async addPenalty(booking_id: string, penalty: number): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({
      where: { booking_id },
      relations: ['motor', 'user'],
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    booking.penalty = (booking.penalty || 0) + penalty;
    await this.bookingRepository.save(booking);

    return booking;
  }

  async getPendingBookingsCount(): Promise<number> {
    const count = await this.bookingRepository.count({
      where: { booking_status: 'Pending' },
    });

    return count;
  }

  async getAdminNotifications(): Promise<Notification[]> {
    const pendingBookings = await this.bookingRepository.find({
      where: { booking_status: 'Pending' },
      relations: ['motor', 'user'],
    });
    const notifications: Notification[] = [];

    const now = new Date();
    const twoHoursLater = new Date(now.getTime() + 2 * 60 * 60 * 1000);

    const returningMotors = await this.bookingRepository.find({
      where: {
        is_rent: true,
        return_date: Between(now, twoHoursLater),
      },
      relations: ['motor', 'user'],
    });

    returningMotors.forEach((booking) => {
      notifications.push({
        type: 'return_due',
        message: `Motor ${booking.motor.model} rented by ${booking.user.first_name} is due for return`,
        booking_id: booking.booking_id,
      });
    });

    pendingBookings.forEach((booking) => {
      notifications.push({
        type: 'pending_booking',
        message: `Pending booking from ${booking.user.first_name} for ${booking.motor.model}`,
        booking_id: booking.booking_id,
      });
    });

    return notifications;
  }

  // CRON JOB APPROACH IT WILL AUTOMATICALLY RUN EVERY HOUR TO CHECK IF THE MOTOR IS OVERDUE AND APPLY PENALTY
  @Cron(CronExpression.EVERY_HOUR)
  async checkOverdueBookings(): Promise<void> {
    console.log('Cron job started');

    const bookings = await this.bookingRepository.find({
      where: { is_rent: true, return_status: 'Pending' },
      relations: ['motor', 'user'],
    });

    const now = new Date();

    for (const booking of bookings) {
      const returnTime = new Date(booking.return_date);

      if (now > returnTime && booking.return_status !== 'Returned') {
        const overdueHours =
          (now.getTime() - returnTime.getTime()) / (1000 * 60 * 60);
        const penaltyToAdd = Math.floor(overdueHours) * this.PENALTY_AMOUNT;

        booking.penalty = (booking.penalty || 0) + penaltyToAdd;
        await this.bookingRepository.save(booking);

        await this.mailerService.sendMail({
          to: booking.user.email,
          subject: 'Overdue Motorcycle Rental Notification',
          text: `Dear ${booking.user.first_name} ${booking.user.last_name},

We noticed that your motorcycle rental period has expired and the motorcycle has not been returned yet. As per our policy, a late return fee has been applied to your booking.

Current Penalty Amount: Php ${booking.penalty}.

Please return the motorcycle as soon as possible to avoid additional charges.

If you have any questions or need assistance, please contact us at 09638913583.

Thank you for your cooperation.

Best regards,
Motorcycle Rental
          `,
        });

        console.log(
          `Penalty applied and notification sent to ${booking.user.email}`,
        );
      }
    }

    console.log('Cron job finished');
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
        pickup_date: booking.pickup_date,
        is_decline: booking.is_decline,
        return_status: booking.return_status,
      };
    });
  }
}
