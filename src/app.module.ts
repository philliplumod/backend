import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './models/user/entities/user.entity';
import { UserModule } from './models/user/user.module';
import { MotorBrand } from './models/motor/entities/motor.brand.entity';
import { MotorModule } from './models/motor/motor.module';
import { Motor } from './models/motor/entities/motor.entity';
import { BookingModule } from './models/booking/booking.module';
import { Booking } from './models/booking/entities/booking.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [User, MotorBrand, Motor, Booking],
        synchronize: true,
        logging: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    MotorModule,
    BookingModule,
  ],
})
export class AppModule {}
