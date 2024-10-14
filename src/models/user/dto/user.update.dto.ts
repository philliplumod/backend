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
import { ApiProperty } from '@nestjs/swagger';

  
  export class CreateUserDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    first_name: string;
    
    @ApiProperty()
    @IsOptional()
    @IsString()
    last_name: string;
    
    @ApiProperty()
    @IsEmail()
    email: string;
    
    @ApiProperty()
    @IsOptional()
    @IsPhoneNumber('PH')
    contact_no: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    birthday: string;
  
    @ApiProperty()
    @IsBoolean()
    status: boolean;
  
    @ApiProperty()
    @IsOptional()
    @IsString()
    password: string;
    
    @ApiProperty()
    @IsOptional()
    @IsString()
    address: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    gender: string;
    
    @ApiProperty()
    @ValidateNested({ each: true })
    @Type(() => CreateDocumentDto)
    document: CreateDocumentDto[];
  }


  
  