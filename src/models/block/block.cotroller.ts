import {
  Controller,
  Post,
  Body,
  Get,
  HttpStatus,
  HttpException,
  Put,
  Param,
} from '@nestjs/common';
import { BlockService } from './block.service';
import { BlockDTO } from './block.dto';
import { ApiTags } from '@nestjs/swagger';
import { Block } from './block.entity';
import { User } from '../user/entities/user.entity';

@ApiTags('block')
@Controller('block')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @Post()
  async blockRenter(@Body() blockDto: BlockDTO): Promise<User> {
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

  @Put(':block_id')
  async unblockRenter(@Param('block_id') block_id: string): Promise<User> {
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
}
