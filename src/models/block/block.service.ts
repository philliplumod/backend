import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Block } from './block.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { BlockDTO } from './block.dto';
import { UpdateBlockDTO } from './block.update.dto';

@Injectable()
export class BlockService {
  constructor(
    @InjectRepository(Block)
    private readonly blockRepository: Repository<Block>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async blockRenter(
    blockDto: BlockDTO,
  ): Promise<{ user: User; block_id: string }> {
    const user = await this.userRepository.findOne({
      where: { user_id: blockDto.user_id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.isBlocked = true;
    await this.userRepository.save(user);

    const block = this.blockRepository.create({
      ...blockDto,
      block_status: true,
      block_id: user.user_id,
    });
    await this.blockRepository.save(block);

    return { user, block_id: block.block_id };
  }

  async getBlockList(): Promise<Block[]> {
    try {
      return await this.blockRepository.find({
        relations: ['user'],
      });
    } catch (error) {
      console.error('Error getting block list:', error);
      throw new Error('Error getting block list');
    }
  }

  async getBlockById(block_id: string): Promise<Block> {
    const block = await this.blockRepository.findOne({
      where: { block_id },
      relations: ['user'],
    });

    if (!block) {
      throw new NotFoundException('Block not found');
    }

    return block;
  }

  async unblockRenter(block_id: string): Promise<User> {
    const block = await this.blockRepository.findOne({
      where: { block_id },
      relations: ['user'], // Ensure the user relation is loaded
    });
    if (!block) {
      throw new NotFoundException('Block not found');
    }
    block.block_status = false;
    await this.blockRepository.save(block);

    const user = await this.userRepository.findOne({
      where: { user_id: block.user.user_id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.isBlocked = false;
    await this.userRepository.save(user);

    return user;
  }

  async updateBlock(
    block_id: string,
    updateBlockDto: UpdateBlockDTO,
  ): Promise<Block> {
    const block = await this.blockRepository.findOne({
      where: { block_id },
    });
    if (!block) {
      throw new NotFoundException('Block not found');
    }
    this.blockRepository.merge(block, updateBlockDto);
    return await this.blockRepository.save(block);
  }
}
