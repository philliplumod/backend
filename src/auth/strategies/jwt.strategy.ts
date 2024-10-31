// jwt.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: (req: Request) => {
        return req?.cookies?.token || null; // Changed 'jwt' to 'token'
      },
      ignoreExpiration: false,
      secretOrKey: 'secret',
    });
  }

  validate(payload: any) {
    console.log('Inside JWT Strategy validated:', payload);
    return payload;
  }
}
