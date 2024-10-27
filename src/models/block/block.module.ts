import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Block } from "./block.entity";
import { BlockController } from "./block.cotroller";
import { BlockService } from "./block.service";
import { User } from "../user/entities/user.entity";


@Module({
  imports: [TypeOrmModule.forFeature([Block, User])],
  controllers: [BlockController],
  providers: [BlockService],
})
export class BlockModule {}
