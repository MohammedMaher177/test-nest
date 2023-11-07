import { Body, Controller } from '@nestjs/common';
import { Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDTO } from './authValidation/auth.validation';
import { User } from 'src/schemas/user.schema';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signUp(@Body() body: SignupDTO): Promise<User | undefined> {
    return this.authService.signUp(body);
  }
}
