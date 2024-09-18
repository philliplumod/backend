import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDocument } from './entities/document.entity';
import { DocumentService } from './user.document.service';
import { User } from '../user/entities/user.entity';
import { DocumentController } from './controller/user.document.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserDocument, User])], // Updated here
  providers: [DocumentService],
  exports: [TypeOrmModule], // Export TypeOrmModule to make UserDocumentRepository available
  controllers: [DocumentController],
})
export class DocumentModule {}
