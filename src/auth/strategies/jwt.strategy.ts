import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';
import { ConfigService } from '@nestjs/config';

interface JwtPayload {
  email: string;
  sub: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET') || 'your-secret-key',
    });
    this.logger.log(`JWT Strategy initialized with secret: ${configService.get('JWT_SECRET') ? '[SECRET]' : 'your-secret-key'}`);
  }

  async validate(payload: JwtPayload) {
    this.logger.log(`Validating JWT payload: ${JSON.stringify(payload)}`);
    try {
      const user = await this.usersService.findById(payload.sub);
      if (!user) {
        this.logger.error(`User with ID ${payload.sub} not found`);
        throw new UnauthorizedException('Usuário não encontrado');
      }
      this.logger.log(`User authenticated: ${user.email}`);
      return user;
    } catch (error) {
      this.logger.error(`Error validating token: ${error.message}`);
      throw new UnauthorizedException('Token inválido');
    }
  }
}
