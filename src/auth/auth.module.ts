import { Module } from '@nestjs/common';
import { AuthServiceLogin } from './service/auth.service';
import { AuthControllerLogin } from './controller/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthControllerLogin],
  providers: [AuthServiceLogin],
})
export class AuthModule {}
