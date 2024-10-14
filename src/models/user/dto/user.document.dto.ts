import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateDocumentDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  license_no: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  license_id: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  support_id_type: string;
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  support_no: string;

}
