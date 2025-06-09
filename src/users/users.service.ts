import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import { hash } from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    const passwordCriptografada = await hash(user.password, 8);

    user.password = passwordCriptografada;

    return await this.repository.save(user);
  }

  async findByUsername(username: string): Promise<User | null> {
    return await this.repository.findOne({
      where: { username },
    });
  }
}
