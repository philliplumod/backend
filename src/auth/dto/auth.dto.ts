import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class AuthDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
