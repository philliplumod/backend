import {
  IsOptional,
  IsString,
  IsBoolean,
  IsPhoneNumber,
  IsDate,
  IsEmail,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  first_name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  last_name: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  status: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isBlocked: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  role: string;

  @ApiProperty()
  @IsOptional()
  contact_no: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  address: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  birthdate: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  gender: string;

  // Document Fields
  @ApiProperty()
  @IsOptional()
  @IsString()
  license_no?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  license_front?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  license_back?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  other_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  other_id_no?: string;
}
