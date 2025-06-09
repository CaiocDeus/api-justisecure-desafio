import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
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
