import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { DocumentService } from '../user.document.service';
import { CreateDocumentDto } from '../user.document.dto';
import { UserDocument } from '../entities/document.entity';

@Controller('document')
export class DocumentController {
  private readonly logger = new Logger(DocumentController.name);

  constructor(private readonly documentService: DocumentService) {}

  @Post('upload')
  async uploadDocument(
    @Body() createDocumentDto: CreateDocumentDto,
  ): Promise<UserDocument> {
    // Updated type
    try {
      return await this.documentService.uploadDocument(createDocumentDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('user/:userId')
  async getDocumentsByUser(
    @Param('userId') userId: string,
  ): Promise<UserDocument[]> {
    // Updated type
    try {
      return await this.documentService.getDocumentsByUser(userId);
    } catch (error) {
      throw new HttpException(
        'Error fetching documents',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('all')
  async getAllDocuments(): Promise<UserDocument[]> {
    try {
      return await this.documentService.getAllDocuments();
    } catch (error) {
      this.logger.error(
        `Error fetching all documents: ${error.message}`,
        error.stack,
      );
      throw new HttpException(
        'Error fetching all documents',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
