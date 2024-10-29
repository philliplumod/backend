import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthDTO } from '../dto/auth.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/models/user/entities/user.entity';
import { AuthServiceLogin } from '../service/auth.service';
import { LocalGuard } from '../guard/local.guard';
import { JwtAuthGuard } from '../guard/jwt.guard';
import { Request } from 'express';

@ApiTags('auth')
@Controller('auth')
@ApiBearerAuth()
export class AuthControllerLogin {
  constructor(private readonly authServiceLogin: AuthServiceLogin) {}

  @Post('login')
  @UseGuards(LocalGuard)
  async login(
    @Body() authPayLoad: AuthDTO,
  ): Promise<{ message: string; user: User; token: string }> {
    const { user, token } = await this.authServiceLogin.login(authPayLoad);
    return { message: 'User logged in successfully', user, token };
  }


  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Req() req: Request): { user: any } {
    console.log('User status:', req.user);
    return { user: req.user };
  }

  

}
