import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateDocumentDto {
  @IsNotEmpty()
  @IsString()
  license_no: string;


  @IsNotEmpty()
  @IsString()
  license_id: string;

  @IsNotEmpty()
  @IsString()
  support_id_type: string;

  @IsNotEmpty()
  @IsString()
  support_no: string;

  @IsNotEmpty()
  @IsUUID()
  user_id: string; // This will be the FK to the User
}
