import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ReturnStatus {
  @ApiProperty()
  @IsOptional()
  @IsString()
  return_status: string;
}
