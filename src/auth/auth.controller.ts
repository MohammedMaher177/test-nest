import { Body, Controller, Delete, UseGuards, Request } from '@nestjs/common';
import { Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDTO, SignupDTO } from './authValidation/auth.validation';
import { AuthGuard } from './authValidation/auth.guard';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  signUp(@Body() body: SignupDTO): Promise<object | undefined> {
    return this.authService.signUp(body);
  }
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() body: SigninDTO): Promise<object | undefined> {
    return this.authService.signin(body);
  }
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete('')
  deleteAccount(@Request() req: string): Promise<object | undefined> {
    return this.authService.deleteAccount(req);
  }
}
