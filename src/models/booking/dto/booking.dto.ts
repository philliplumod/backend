import { ApiProperty } from '@nestjs/swagger';
import {
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
  pickup_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  return_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  booking_status: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  helmet: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  second_helmet: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phone_folder: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  extra_storage: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  payment_method: string;
}
