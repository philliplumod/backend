import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';

export class BookingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  pickup_date: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  return_date: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  booking_status: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  helmet: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  second_helmet: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  phone_folder: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  extra_storage: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  payment_method: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  motor_id: string;
}
