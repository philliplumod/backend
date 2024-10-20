import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class MotorDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  color: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  plate_no: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  motor_picture: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  model: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isVisible: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isDelete: boolean;

  // brand_id to select the motor brand
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  brand_id: string;
}
