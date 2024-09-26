import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsBoolean,
  IsArray,
  ValidateNested,
  IsNumber,
  IsPhoneNumber,
} from 'class-validator';
import { CreateDocumentDto } from './user.document.dto';
import { Type } from 'class-transformer';

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
  contact_no: number;

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
  gender: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDocumentDto)
  documents: CreateDocumentDto[];
}

export class LoginUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
