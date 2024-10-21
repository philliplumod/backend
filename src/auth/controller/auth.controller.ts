import { Body, Controller, Post } from '@nestjs/common';
import { AuthDTO } from '../dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/models/user/entities/user.entity';
import { AuthServiceLogin } from '../service/auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthControllerLogin {
  constructor(private readonly authServiceLogin: AuthServiceLogin) {}

  @Post('login')
  async login(
    @Body() authPayLoad: AuthDTO,
  ): Promise<{ message: string; user: User }> {
    const user = await this.authServiceLogin.login(authPayLoad);
    return { message: 'User logged in successfully', user };
  }
}
