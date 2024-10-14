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
  booking_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  return_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  booking_status: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  message: string;

  // Foreign key for User
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  user_id: string;

  // Foreign key for Motor
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  motor_id: string;
}
