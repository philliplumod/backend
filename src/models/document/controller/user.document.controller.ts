<<<<<<< HEAD
import { Controller, Post, Get, Body, Param, HttpException, HttpStatus, Logger, ParseUUIDPipe } from '@nestjs/common';
import { UserDocument } from '../entities/document.entity';
import { CreateDocumentDto } from '../user.document.dto';
import { DocumentService } from '../user.document.service';
=======
import { Controller, Post, Body, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { DocumentService } from '../user.document.service';
import { CreateDocumentDto } from '../user.document.dto';
import { UserDocument } from '../entities/document.entity';

>>>>>>> origin/main


@Controller('document')
export class DocumentController {
<<<<<<< HEAD
  private readonly logger = new Logger(DocumentController.name);

  constructor(private readonly documentService: DocumentService) {}

  @Post('upload')
  async uploadDocument(@Body() createDocumentDto: CreateDocumentDto): Promise<UserDocument> {
=======
  constructor(private readonly documentService: DocumentService) {}

  @Post('upload')
  async uploadDocument(@Body() createDocumentDto: CreateDocumentDto): Promise<UserDocument> {  // Updated type
>>>>>>> origin/main
    try {
      return await this.documentService.uploadDocument(createDocumentDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('user/:userId')
<<<<<<< HEAD
  async getDocumentsByUser(@Param('userId', new ParseUUIDPipe()) userId: string): Promise<UserDocument[]> {
    try {
      return await this.documentService.getDocumentsByUser(userId);
    } catch (error) {
      this.logger.error(`Error fetching documents for user ${userId}: ${error.message}`, error.stack);
      throw new HttpException('Error fetching documents', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
=======
  async getDocumentsByUser(@Param('userId') userId: string): Promise<UserDocument[]> {  // Updated type
    try {
      return await this.documentService.getDocumentsByUser(userId);
    } catch (error) {
      throw new HttpException('Error fetching documents', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
>>>>>>> origin/main
