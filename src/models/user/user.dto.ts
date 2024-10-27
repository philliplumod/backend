import { IsNotEmpty, IsString, IsEmail, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsEmail()
  email: string;

  contact_no: string;

  @IsNotEmpty()
  @IsString()
  birthday: string;

  @IsBoolean()
  status: boolean;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class LoginUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsEmail()
  email: string;

  contact_no: string;

  @IsNotEmpty()
  @IsString()
  birthday: string;

  @IsBoolean()
  status: boolean;

  @IsNotEmpty()
  @IsString()
  password: string;
}
