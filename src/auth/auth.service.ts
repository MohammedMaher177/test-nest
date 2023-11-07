import { Injectable, BadRequestException } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { SignupDTO } from './authValidation/auth.validation';
import { hashSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(body: SignupDTO): Promise<User | undefined> {
    const { rePassword, password, email } = body;
    if (rePassword !== password) {
      throw new BadRequestException('password and confirm password not match');
    }
    const existEmail = await this.userService.findByEmail(email);
    if (existEmail) {
      throw new BadRequestException('Email Already Exist, Plz Log-In');
    }
    // log(body);
    const saltOrRounds = 10;
    const hash = await hashSync(password, saltOrRounds);
    // log(hash);
    body.password = hash;
    const user = await this.userService.createUser(body);
    // const payload = { email: user.email };
    // const token = await this.jwtService.signAsync(payload);
    return user;
  }
}
