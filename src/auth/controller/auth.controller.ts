import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthDTO } from '../dto/auth.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/models/user/entities/user.entity';
import { AuthServiceLogin } from '../service/auth.service';
import { LocalGuard } from '../guard/local.guard';
import { JwtAuthGuard } from '../guard/jwt.guard';
import { Request, Response } from 'express';

@ApiTags('auth')
@Controller('auth')
@ApiBearerAuth()
export class AuthControllerLogin {
  constructor(private readonly authServiceLogin: AuthServiceLogin) {}

  @Post('login')
async login(@Body() authPayLoad: AuthDTO, @Res() res: Response) {
  const { user, token } = await this.authServiceLogin.login(authPayLoad);

  // Set the cookie securely
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 3600000,
  });

  return res.json({
    message: 'User logged in successfully',
    user,
  });
}


@Get('status')
@UseGuards(JwtAuthGuard)
status(@Req() req: Request) {
  return { user: req.user };
}
}
