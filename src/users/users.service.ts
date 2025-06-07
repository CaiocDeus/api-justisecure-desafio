import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { compare, hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    const passwordCriptografada = await hash(user.password, 8);

    user.password = passwordCriptografada;

    return await this.repository.save(user);
  }

  async findByUsername(username: string): Promise<User | null> {
    return await this.repository.findOne({
      where: { username: username },
    });
  }
}
