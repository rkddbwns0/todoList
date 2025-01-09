import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: '이름을 입력해 주세요.' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: '이메일을 입력해 주세요.' })
  @IsString()
  @IsEmail({}, { message: '이메일 형식에 맞게 입력해 주세요.' })
  email: string;

  @IsNotEmpty({ message: '비밀번호를 입력해 주세요.' })
  @IsString()
  @MaxLength(15, { message: '비밀번호는 최대 15자입니다.' })
  @MinLength(8, { message: '비밀번호는 최소 8자입니다.' })
  password: string;
}

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class LogoutDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  refresh_token: string;
}
