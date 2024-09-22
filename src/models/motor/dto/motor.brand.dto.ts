import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateBrandDto {
  @IsNotEmpty()
  @IsString()
  brand_name: string;

  @IsNotEmpty()
  @IsUUID()
  motor_id: string; // This will be the FK to the Motor
}
