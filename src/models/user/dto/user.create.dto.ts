import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
  IsPhoneNumber,
  IsDate,
  IsEmail,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  profile_pic: string;

  @ApiProperty()
  @IsOptional()
  role: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber()
  contact_no: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  birthdate: string;

  @ApiProperty()
  @IsNotEmpty()
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
