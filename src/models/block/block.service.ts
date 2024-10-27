import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Block } from './block.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { BlockDTO } from './block.dto';

@Injectable()
export class BlockService {
  constructor(
    @InjectRepository(Block)
    private readonly blockRepository: Repository<Block>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async blockRenter(blockDto: BlockDTO): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { user_id: blockDto.user_id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.isBlocked = blockDto.block_status;
    await this.userRepository.save(user);

    const block = this.blockRepository.create({
      ...blockDto,
      user,
    });
    await this.blockRepository.save(block);

    return user;
  }

  async getBlockList(): Promise<Block[]> {
    try {
      return await this.blockRepository.find({
        relations: ['user'],
        where: { block_status: true },
      });
    } catch (error) {
      console.error('Error getting block list:', error);
      throw new Error('Error getting block list');
    }
  }

  async unblockRenter(block_id: string): Promise<User> {
    const block = await this.blockRepository.findOne({
      where: { block_id },
    });
    if (!block) {
      throw new NotFoundException('Block not found');
    }
    block.block_status = false;
    await this.blockRepository.save(block);

    const user = await this.userRepository.findOne({
      where: { user_id: block.user.user_id },
    });
    user.isBlocked = false;
    await this.userRepository.save(user);

    return user;
  }
}
