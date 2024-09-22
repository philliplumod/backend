import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateMotorDto {
  @IsNotEmpty()
  @IsString()
  model: string;

  @IsNotEmpty()
  @IsNumber() // Changed to IsNumber for price_per_day
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

  @IsNotEmpty()
  @IsString()
  brand_name: string; // This will be the brand name

  @IsNotEmpty()
  @IsUUID() // Add this if you want to reference the MotorBrand
  brand_id: string; // This will be the FK to the MotorBrand
}
