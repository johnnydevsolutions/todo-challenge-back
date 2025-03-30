import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ description: 'Título da tarefa' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Descrição da tarefa', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}
