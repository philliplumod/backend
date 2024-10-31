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
  @UseGuards(LocalGuard)
  async login(
    @Body() authPayLoad: AuthDTO,
    @Res() res: Response,
  ): Promise<void> {
    const { user, token } = await this.authServiceLogin.login(authPayLoad);
    res
      .cookie('jwt', token, {
        httpOnly: true,
        secure: false,
        maxAge: 3600000,
      })
      .json({ message: 'User logged in successfully', user });
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Req() req: Request): { user: any } {
    console.log('User status:', req.user);
    return { user: req.user };
  }
}
