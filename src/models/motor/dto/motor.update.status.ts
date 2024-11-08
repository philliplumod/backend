import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsBoolean } from 'class-validator';

export class UpdateMotorStatusDto {
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isVisible: boolean;
}
