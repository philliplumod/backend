import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsBoolean,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';
import { UserDocument } from '../entities/user.document.entity';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber('PH')
  contact_no: string; // Changed from number to string

  @IsNotEmpty()
  @IsString()
  birthday: string;

  @IsBoolean()
  status: boolean;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  gender: string; // Ensure this field is not null

  @IsOptional()
  document?: UserDocument;
}