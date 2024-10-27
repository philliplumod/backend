import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID, IsBoolean } from 'class-validator';

export class BlockDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  block_status: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  user_id: string;
}
