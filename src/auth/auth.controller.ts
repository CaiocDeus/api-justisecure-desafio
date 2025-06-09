import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.create(userDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() userDto: CreateUserDto) {
    return this.authService.signIn(userDto.username, userDto.password);
  }
}
