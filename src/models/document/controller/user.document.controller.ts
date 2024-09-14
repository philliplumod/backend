import { Controller, Post, Body, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { DocumentService } from '../user.document.service';
import { CreateDocumentDto } from '../user.document.dto';
import { UserDocument } from '../entities/document.entity';



@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post('upload')
  async uploadDocument(@Body() createDocumentDto: CreateDocumentDto): Promise<UserDocument> {  // Updated type
    try {
      return await this.documentService.uploadDocument(createDocumentDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('user/:userId')
  async getDocumentsByUser(@Param('userId') userId: string): Promise<UserDocument[]> {  // Updated type
    try {
      return await this.documentService.getDocumentsByUser(userId);
    } catch (error) {
      throw new HttpException('Error fetching documents', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
