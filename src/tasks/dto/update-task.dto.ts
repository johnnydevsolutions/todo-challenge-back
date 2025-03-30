import { IsOptional, IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiProperty({ description: 'Título da tarefa', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ description: 'Descrição da tarefa', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Status de conclusão da tarefa',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
