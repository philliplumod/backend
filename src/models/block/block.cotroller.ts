import {
  Controller,
  Post,
  Body,
  Get,
  HttpStatus,
  HttpException,
  Put,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { BlockService } from './block.service';
import { BlockDTO } from './block.dto';
import { ApiTags } from '@nestjs/swagger';
import { Block } from './block.entity';
import { User } from '../user/entities/user.entity';
import { UpdateBlockDTO } from './block.update.dto';

@ApiTags('block')
@Controller('block')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @Post('user')
  async blockRenter(
    @Body() blockDto: BlockDTO,
  ): Promise<{ user: User; block_id: string }> {
    try {
      return this.blockService.blockRenter(blockDto);
    } catch (error) {
      console.error('Error in blockRenter:', error);

      throw new HttpException(
        error.message || 'Error blocking renter',

        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async getBlockList(): Promise<BlockDTO[]> {
    try {
      return this.blockService.getBlockList();
    } catch (error) {
      console.error('Error in getBlockList:', error);
      throw new HttpException(
        'Error getting block list',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':block_id')
  async getBlockById(@Param('block_id') block_id: string): Promise<Block> {
    try {
      return this.blockService.getBlockById(block_id);
    } catch (error) {
      console.error('Error in getBlockById:', error);
      throw new HttpException(
        error.message || 'Error fetching block',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put('user/:id')
  async updateBlockEntry(@Param('id') block_id: string): Promise<User> {
    try {
      return this.blockService.unblockRenter(block_id);
    } catch (error) {
      console.error('Error in unblockRenter:', error);
      throw new HttpException(
        error.message || 'Error unblocking renter',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Put('update/:id')
  async updateBlock(
    @Param('id') block_id: string,
    @Body() updateBlockDto: UpdateBlockDTO,
  ): Promise<Block> {
    try {
      return await this.blockService.updateBlock(block_id, updateBlockDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Block not found');
      }
      throw error;
    }
  }
}
