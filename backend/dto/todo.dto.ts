import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SelectTodoDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(40)
  descript: string;
}

export class DeleteTodoDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber({}, { each: true })
  no: number;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}

export class SuccessTodoDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber({}, { each: true })
  no: number;
}

export class PinTodoDto {
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  no: number;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;
}
