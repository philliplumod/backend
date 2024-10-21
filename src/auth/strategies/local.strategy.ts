import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthServiceLogin } from '../service/auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDTO } from '../dto/auth.dto';
import { User } from 'src/models/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthServiceLogin) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const authPayload: AuthDTO = { email, password };
    const { user } = await this.authService.login(authPayload);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
