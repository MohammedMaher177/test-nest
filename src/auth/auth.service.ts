import { Injectable, BadRequestException } from '@nestjs/common';
import { SigninDTO, SignupDTO } from './authValidation/auth.validation';
import { hashSync, compareSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(body: SignupDTO): Promise<object | undefined> {
    const { rePassword, password, email } = body;
    if (rePassword !== password) {
      throw new BadRequestException('password and confirm password not match');
    }
    const existEmail = await this.userService.findByEmail(email);
    if (existEmail) {
      throw new BadRequestException('Email Already Exist, Plz Log-In');
    }
    const saltOrRounds = 10;
    const hash = await hashSync(password, saltOrRounds);
    body.password = hash;
    const user = await this.userService.createUser(body);
    const payload = { email: user.email };
    const token = await this.jwtService.signAsync(payload);
    return { token };
  }

  async signin(body: SigninDTO): Promise<object | undefined> {
    const existUser = await this.userService.findByEmail(body.email);
    const result = await compareSync(body.password, existUser.password);
    if (result) {
      const payload = { email: existUser.email };
      const token = await this.jwtService.signAsync(payload);
      return { token };
    } else {
      throw new BadRequestException('Incorrect Password');
    }
  }
  async deleteAccount(req: string): Promise<object | undefined> {
    const user = await this.userService.deleteUser(req['user']);
    console.log(user);

    return { message: req['user'] };
  }
}
