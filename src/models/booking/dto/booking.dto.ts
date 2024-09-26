import { IsDate, IsDateString, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class BookingDto {
  @IsNotEmpty()
  @IsDateString()
  booking_date: Date;

  @IsNotEmpty()
  @IsDateString()
  return_date: Date;

  @IsNotEmpty()
  @IsString()
  booking_status: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  // Foreign key for User
  @IsNotEmpty()
  @IsUUID()
  user_id: string;

  // Foreign key for Motor
  @IsNotEmpty()
  @IsUUID()
  motor_id: string;
}
