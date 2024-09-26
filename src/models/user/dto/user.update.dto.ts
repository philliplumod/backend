import { Type } from 'class-transformer';
import {
    IsOptional,
    IsString,
    IsEmail,
    IsBoolean,
    IsArray,
    ValidateNested,
    IsNumber,
    IsPhoneNumber,
  } from 'class-validator';
import { CreateDocumentDto } from './user.document.dto';

  
  export class CreateUserDto {
    @IsOptional()
    @IsString()
    first_name: string;
  
    @IsOptional()
    @IsString()
    last_name: string;
  
    @IsEmail()
    email: string;
  
    @IsOptional()
    @IsPhoneNumber('PH')
    contact_no: number;
  
    @IsOptional()
    @IsString()
    birthday: string;
  
    @IsBoolean()
    status: boolean;
  
    @IsOptional()
    @IsString()
    password: string;
  
    @IsOptional()
    @IsString()
    address: string;
  
    @IsOptional()
    @IsString()
    gender: string;
  
    @ValidateNested({ each: true })
    @Type(() => CreateDocumentDto)
    document: CreateDocumentDto[];
  }


  
  