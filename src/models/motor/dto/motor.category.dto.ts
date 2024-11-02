import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class MotorCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  category_name: string;
}
