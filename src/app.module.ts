import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './models/user/user.module';
import { MotorModule } from './models/motor/motor.module';
import { BookingModule } from './models/booking/booking.module';
import { dataSourceOptions } from 'db/data-source';
import { logger } from './middlewares/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { BlockModule } from './models/block/block.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
    }),
    UserModule,
    MotorModule,
    BookingModule,
    AuthModule,
    BlockModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes('*');
  }
}
