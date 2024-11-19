import { Module } from '@nestjs/common';
import { BookingController } from './controllers/booking.controller';
import { BookingService } from './services/booking.service';
import { Motor } from '../motor/entities/motor.entity';
import { User } from '../user/entities/user.entity';
import { Booking } from './entities/booking.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Motor, User, Booking]),
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('MAIL_HOST'),
          port: configService.get('MAIL_PORT'),
          secure: true,
          auth: {
            user: configService.get<string>('MAIL_USER'),
            pass: configService.get<string>('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: configService.get<string>('MAIL_SENDER'),
        },
      }),
    }),
  ],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
