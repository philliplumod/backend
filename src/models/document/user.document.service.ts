import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateDocumentDto } from './user.document.dto';
import { UserDocument } from 'src/models/document/entities/document.entity';  // Renamed import

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(UserDocument)  // Updated here
    private readonly documentRepository: Repository<UserDocument>,  // Updated type
    
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async uploadDocument(createDocumentDto: CreateDocumentDto): Promise<UserDocument> {
    const { user_id, license_no, license_id, support_id_type, support_no } = createDocumentDto;

    const user = await this.userRepository.findOne({ where: { user_id } });
    if (!user) {
      throw new Error('User not found');
    }

    const newDocument = this.documentRepository.create({
      license_no,
      license_id,
      support_id_type,
      support_no,
      user,
    });

    return await this.documentRepository.save(newDocument);
  }

  async getDocumentsByUser(user_id: string): Promise<UserDocument[]> {
    return await this.documentRepository.find({
      where: { user: { user_id } },
      relations: ['user'],
    });
  }
}
