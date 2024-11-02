import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID, IsBoolean } from 'class-validator';

export class UpdateBlockDTO {
  @ApiProperty()
  @IsString()
  message: string;
}
