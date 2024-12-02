import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsNumber,
  IsOptional,
  IsDate,
} from 'class-validator';

export class BookingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  pickup_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  return_date: Date;

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
  @IsOptional()
  @IsString()
  reference_link: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  remark: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  paid_status: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  return_status: string;

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
  @IsOptional()
  @IsUUID()
  motor_id: string;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  start_booking: Date;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  end_booking: Date;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  user_id: string; // Add this line
}
