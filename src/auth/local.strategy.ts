import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthPayloadDto } from './dto/auth.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super(); // other configuration can also be passed to super()
  }

  async validate({ username, password }: AuthPayloadDto): Promise<any> {
    const user = await this.authService.validateUser({ username, password });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
