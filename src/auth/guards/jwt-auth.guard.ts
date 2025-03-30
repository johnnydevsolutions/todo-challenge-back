import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    
    this.logger.log(`Request to ${request.method} ${request.url}`);
    
    if (!authHeader) {
      this.logger.error('No Authorization header found');
      throw new UnauthorizedException('Authorization header missing');
    }
    
    this.logger.log(`Authorization header: "${authHeader}"`);
    
    if (authHeader.startsWith('Bearer Bearer ')) {
      const fixedToken = authHeader.replace('Bearer Bearer ', 'Bearer ');
      request.headers.authorization = fixedToken;
      this.logger.log(`Corrigindo header de autorização duplicado. Novo header: "${fixedToken}"`);
    } else if (authHeader.startsWith('bearer Bearer ') || 
        authHeader.startsWith('Bearer bearer ') || authHeader.startsWith('bearer bearer ')) {
      const fixedToken = 'Bearer ' + authHeader.split(/bearer\s+bearer\s+|Bearer\s+Bearer\s+|bearer\s+Bearer\s+|Bearer\s+bearer\s+/i)[1];
      request.headers.authorization = fixedToken;
      this.logger.log(`Corrigindo header de autorização duplicado. Novo header: "${fixedToken}"`);
    } else if (authHeader.toLowerCase().startsWith('bearer ')) {
      if (authHeader.startsWith('bearer ')) {
        const fixedToken = 'Bearer ' + authHeader.substring(7);
        request.headers.authorization = fixedToken;
        this.logger.log(`Normalizando prefixo bearer para Bearer. Novo header: "${fixedToken}"`);
      }
    } else if (!authHeader.startsWith('Bearer ')) {
      this.logger.error('Authorization header does not start with "Bearer "');
      throw new UnauthorizedException('Invalid Authorization format. Use: Bearer token');
    }
    
    const token = authHeader.substring(7);
    this.logger.log(`Token extraído: "${token.substring(0, 15)}..."`);
    
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    if (err) {
      this.logger.error(`Authentication error: ${err.message}`);
      throw err;
    }
    
    if (!user) {
      this.logger.error(`Authentication failed: ${info?.message || 'User not found'}`);
      throw new UnauthorizedException(info?.message || 'Authentication failed');
    }
    
    this.logger.log(`Authentication successful for user ID: ${user.id}`);
    return user;
  }
}
