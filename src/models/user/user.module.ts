import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { AuthController } from './controller/user.controller';
import { User } from './entities/user.entity';
import { UserDocument } from './entities/user.document.entity';
import { LoggerMiddleware } from 'src/middlewares/logger.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserDocument])], // Register User entity
  providers: [UserService],
  controllers: [AuthController],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('user');
  }
}
