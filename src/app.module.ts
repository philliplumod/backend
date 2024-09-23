import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './models/user/entities/user.entity';
import { UserModule } from './models/user/user.module';
import { UserDocument } from './models/user/entities/user.document.entity';
import { MotorBrand } from './models/motor/entities/motor.brand.entity';
import { MotorModule } from './models/motor/motor.module';
import { Motor } from './models/motor/entities/motor.entity';

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
        entities: [User, UserDocument, MotorBrand, Motor],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    MotorModule,
  ],
})
export class AppModule {}
