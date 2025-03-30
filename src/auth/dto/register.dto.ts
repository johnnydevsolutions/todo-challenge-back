import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  Matches,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: 'Email do usuário (será usado para login)',
    example: '',
  })
  @IsEmail({}, { message: 'Por favor, insira um email válido' })
  @IsNotEmpty({ message: 'O email é obrigatório' })
  email: string;

  @ApiProperty({
    description: 'Nome completo do usuário',
    example: '',
  })
  @IsString({ message: 'O nome deve ser um texto válido' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MinLength(3, { message: 'O nome deve ter pelo menos 3 caracteres' })
  name: string;

  @ApiProperty({
    description:
      'Senha (mín. 8 caracteres, deve conter letra maiúscula, minúscula e número)',
    example: '',
  })
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]*$/, {
    message:
      'A senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número',
  })
  password: string;

  @ApiProperty({
    description: 'Confirmação da senha',
    example: '',
  })
  @IsNotEmpty({ message: 'A confirmação de senha é obrigatória' })
  passwordConfirmation: string;
}
