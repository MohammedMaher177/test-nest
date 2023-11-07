import { Controller, Get, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/schemas/user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    const users = await this.userService.findAll();
    if (!users) {
      throw new NotFoundException('Users not found');
    }
    return users;
  }

  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
