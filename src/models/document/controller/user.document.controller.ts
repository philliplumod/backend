import { Controller, Post, Get, Body, Param, HttpException, HttpStatus, Logger, ParseUUIDPipe } from '@nestjs/common';
import { UserDocument } from '../entities/document.entity';
import { CreateDocumentDto } from '../user.document.dto';
import { DocumentService } from '../user.document.service';


@Controller('document')
export class DocumentController {
  private readonly logger = new Logger(DocumentController.name);

  constructor(private readonly documentService: DocumentService) {}

  @Post('upload')
  async uploadDocument(@Body() createDocumentDto: CreateDocumentDto): Promise<UserDocument> {
    try {
      return await this.documentService.uploadDocument(createDocumentDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('user/:userId')
  async getDocumentsByUser(@Param('userId', new ParseUUIDPipe()) userId: string): Promise<UserDocument[]> {
    try {
      return await this.documentService.getDocumentsByUser(userId);
    } catch (error) {
      this.logger.error(`Error fetching documents for user ${userId}: ${error.message}`, error.stack);
      throw new HttpException('Error fetching documents', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}