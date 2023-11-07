import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PostController } from './post/post.controller';
import { PostModule } from './post/post.module';
import { UserService } from './user/user.service';
import { User, UserSchema } from './schemas/user.schema';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://momaherfrontend:DE3NomTF8u9dz0tT@cluster0.7l7zov4.mongodb.net/',
    ),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }, // Register UserModel here
    ]),
    UserModule,
    PostModule,
  ],
  controllers: [AppController, UserController, PostController, AuthController],
  providers: [AppService, UserService, AuthService],
})
export class AppModule {}
