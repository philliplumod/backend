import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateMotorDto {
  @IsNotEmpty()
  @IsString()
  model: string;

  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsNotEmpty()
  @IsString()
  price_per_day: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  motor_reg_no: string;

  @IsNotEmpty()
  @IsBoolean()
  isVisible: boolean;
}
