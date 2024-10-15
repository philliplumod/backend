import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsEmail, IsString, IsNotEmpty } from "class-validator";

export class LoginUserDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;
}