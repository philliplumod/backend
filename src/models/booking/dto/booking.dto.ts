import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsDateString,
  IsNotEmpty,
  IsUUID,
  IsNumber,
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
  @IsNumber()
  days: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  total_amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  booking_status: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  free_helmet: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  second_helmet: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phone_holder: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  extra_storage: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  payment_method: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  motor_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  user_id: string; // Add this line
}