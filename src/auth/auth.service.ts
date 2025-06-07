import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn(username: string, password: string): Promise<{ access_token: string }> {
      const user = await this.usersService.findByUsername(username);

      if (!user) throw new UnauthorizedException('Credenciais inválidas!');

      const passwordMatch = await compare(password, user.password);

      if (!passwordMatch) throw new UnauthorizedException('Credenciais inválidas!');

      const payload = { sub: user.id, username: user.username };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }

}
