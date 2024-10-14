import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateDocumentDto {
  @IsOptional()
  @IsString()
  license_no: string;

  @IsOptional()
  @IsString()
  license_id: string;

  @IsOptional()
  @IsString()
  support_id_type: string;

  @IsOptional()
  @IsString()
  support_no: string;

}
