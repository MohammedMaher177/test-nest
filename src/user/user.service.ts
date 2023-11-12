import { Injectable } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SignupDTO } from 'src/auth/authValidation/auth.validation';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }
  async createUser(user: SignupDTO): Promise<User | null> {
    return await this.userModel.create({
      ...user,
    });
  }
  async deleteUser(user: User): Promise<User | null> {
    return await this.userModel.findByIdAndDelete(user['_id']);
  }
}
