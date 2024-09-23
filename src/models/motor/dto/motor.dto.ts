import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class MotorDto {
  @IsNotEmpty()
  @IsString()
  color: string;

  @IsNotEmpty()
  @IsString()
  plate_no: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  model: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  // brand_id to select the motor brand
  @IsNotEmpty()
  @IsUUID()
  brand_id: string;
}
