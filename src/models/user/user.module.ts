import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthController } from './controller/user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Register User entity
  providers: [UserService],
  controllers: [AuthController],
})
export class UserModule {}
