import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Query,
  Request,
  Optional,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../users/entities/user.entity';
import { ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

interface RequestWithUser extends Request {
  user: User;
}

@ApiTags('tasks')
@ApiBearerAuth('access-token')
@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Request() req: RequestWithUser) {
    return this.tasksService.create(createTaskDto, req.user);
  }

  @Get()
  @ApiQuery({ 
    name: 'completed', 
    required: false, 
    type: Boolean,
    description: 'Filtrar por status de conclusão (true/false). Se não informado, retorna todas as tarefas.' 
  })
  findAll(
    @Request() req: RequestWithUser,
    @Query('completed') @Optional() completed?: string,
  ) {
    // Se o parâmetro não for fornecido, retorna todas as tarefas
    if (completed === undefined) {
      return this.tasksService.findAll(req.user);
    }
    
    // Converte o parâmetro string para boolean
    const isCompleted = completed === 'true';
    return this.tasksService.findAll(req.user, isCompleted);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.tasksService.findOne(+id, req.user);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Request() req: RequestWithUser,
  ) {
    return this.tasksService.update(+id, updateTaskDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.tasksService.remove(+id, req.user);
  }
}
