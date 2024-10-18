import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Booking } from 'src/models/booking/entities/booking.entity';
import { MotorBrand } from 'src/models/motor/entities/motor.brand.entity';
import { Motor } from 'src/models/motor/entities/motor.entity';
import { User } from 'src/models/user/entities/user.entity';

ConfigModule.forRoot({
  isGlobal: true,
});

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migration/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
