import { IsNotEmpty, IsString } from 'class-validator';

export class MotorBrandDto {
  @IsNotEmpty()
  @IsString()
  brand_name: string;
}
