import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class PaymentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  total_amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  payment_method: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  date_of_payment: string;
}
