import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class SignupDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(25)
  name: string;
  @IsEmail()
  email: string;
  @IsStrongPassword()
  password: string;
  @IsStrongPassword()
  rePassword: string;
  @IsNumber()
  @Min(7)
  age: number;
}
export class SigninDTO {
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
}
