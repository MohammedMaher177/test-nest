import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { SignupDTO } from './authValidation/auth.validation';
import { hashSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(body: SignupDTO): Promise<any> {
    const { rePassword, password, email } = body;
    if (rePassword !== password) {
      throw new BadRequestException('password and confirm password not match');
    }
    const existEmail = await this.userModel.findOne({ email });
    if (existEmail) {
      throw new BadRequestException('Email Already Exist, Plz Log-In');
    }
    const saltOrRounds = 10;
    const hash = await hashSync(password, saltOrRounds);
    body.password = hash;
    const user = await this.userModel.create(body);

    const payload = { id: user._id, email: user.email };
    const token = await this.jwtService.signAsync(payload);
    return token;
  }
}
