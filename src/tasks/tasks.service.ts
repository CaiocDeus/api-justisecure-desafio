import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  // TODO Melhorar retornos
  constructor(
    @InjectRepository(Task)
    private repository: Repository<Task>,
  ) {}

  create(createTaskDto: CreateTaskDto) {
    return this.repository.save(createTaskDto);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOne({where: { id }});
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    return this.repository.update(id, updateTaskDto);
  }

  remove(id: string) {
    return this.repository.delete(id);
  }
}
