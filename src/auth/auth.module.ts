import { Module } from '@nestjs/common';
import { AuthServiceLogin } from './service/auth.service';
import { AuthControllerLogin } from './controller/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
    PassportModule,
  ],
  controllers: [AuthControllerLogin],
  providers: [AuthServiceLogin, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
