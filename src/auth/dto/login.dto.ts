import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'Email do usuário',
    example: '',
  })
  @IsEmail({}, { message: 'Por favor, insira um email válido' })
  @IsNotEmpty({ message: 'O email é obrigatório' })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: '',
  })
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  password: string;
}
