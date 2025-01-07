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

export class UpdateTodoDto {
  @IsNumber()
  @IsNotEmpty()
  no: number;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  descript?: string;
}

export class DeleteTodoDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber({}, { each: true })
  no: number;
}

export class SuccessTodoDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber({}, { each: true })
  no: number[];
}
