import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
  Logger,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Body() loginDto: LoginDto) {
    this.logger.log(`Login attempt for email: ${loginDto.email}`);
    return this.authService.login(loginDto);
  }

  @Post('register')
  @ApiBody({ type: RegisterDto })
  async register(@Body() registerDto: RegisterDto) {
    this.logger.log(`Registration attempt for email: ${registerDto.email}`);
    return this.authService.register(registerDto);
  }

  @Get('teste')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  async teste(@Request() req: any) {
    this.logger.log(`Teste de autenticação para usuário: ${req.user?.email}`);
    return { 
      message: 'Autenticação bem-sucedida!',
      userId: req.user?.id,
      userEmail: req.user?.email,
      userName: req.user?.name
    };
  }
}
