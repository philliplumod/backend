import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsEmail, IsPhoneNumber, IsBoolean, IsOptional } from 'class-validator';

export class BaseUserDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  first_name?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  last_name?: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  email?: string;


  @ApiProperty()
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty()
  @IsPhoneNumber(null)
  @IsOptional()
  contact_no?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  birthday?: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  status?: boolean;

  @ApiProperty()
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  gender?: string;

  @ApiProperty()
  @IsOptional()
  document?: any; // Adjust type as needed
}

export class UpdateUserDto extends PartialType(BaseUserDto) {}