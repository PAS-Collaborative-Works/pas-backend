import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthPayloadDto } from '../dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ username, password }: AuthPayloadDto): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && user.password === password) {
      const { userId, username } = user;
      return { userId, username };
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
