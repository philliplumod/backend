import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class MotorBrandDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  brand_name: string;
}
