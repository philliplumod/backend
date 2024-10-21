import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthDTO } from '../dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/models/user/entities/user.entity';
import { AuthServiceLogin } from '../service/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalGuard } from '../guard/local.guard';

@ApiTags('auth')
@Controller('auth')
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
}
