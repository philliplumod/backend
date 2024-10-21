import { Module } from '@nestjs/common';
import { AuthServiceLogin } from './service/auth.service';
import { AuthControllerLogin } from './controller/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './passport/local.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({ secret: 'secret', signOptions: { expiresIn: '1hr' } }),
    PassportModule
  ],
  controllers: [AuthControllerLogin],
  providers: [AuthServiceLogin, LocalStrategy],
})
export class AuthModule {}
