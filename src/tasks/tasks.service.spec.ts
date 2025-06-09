import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './enums/task-status.enum';
import { UpdateTaskDto } from './dto/update-task.dto';

describe('TasksService', () => {
  let service: TasksService;
  let repository: Repository<Task>;
  const TASK_REPOSITORY_TOKEN = getRepositoryToken(Task);

  const mockTaskRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: TASK_REPOSITORY_TOKEN,
          useValue: mockTaskRepository,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repository = module.get<Repository<Task>>(TASK_REPOSITORY_TOKEN);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('repository should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create a new task', () => {
      const dto: CreateTaskDto = { title: 'Test Task', description: 'Desc', status: TaskStatus[0] };
      const result = { ...dto, id: '1' };

      mockTaskRepository.save.mockReturnValue(result);

      expect(service.create(dto)).toEqual(result);
      expect(mockTaskRepository.save).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const tasks = [{ id: '1', title: 'Test', description: 'desc' }];
      mockTaskRepository.find.mockResolvedValue(tasks);

      const result = await service.findAll();
      expect(result).toEqual(tasks);
      expect(mockTaskRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single task', async () => {
      const task = { id: '1', title: 'Test', description: 'desc' };
      mockTaskRepository.findOne.mockResolvedValue(task);

      const result = await service.findOne('1');
      expect(result).toEqual(task);
      expect(mockTaskRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    });
  });

  describe('update', () => {
    it('should update a task', async () => {
      const dto: UpdateTaskDto = { title: 'Updated' };
      const updateResult = { affected: 1 };
      mockTaskRepository.update.mockResolvedValue(updateResult);

      const result = await service.update('1', dto);
      expect(result).toEqual(updateResult);
      expect(mockTaskRepository.update).toHaveBeenCalledWith('1', dto);
    });
  });

  describe('remove', () => {
    it('should delete a task', async () => {
      const deleteResult = { affected: 1 };
      mockTaskRepository.delete.mockResolvedValue(deleteResult);

      const result = await service.remove('1');
      expect(result).toEqual(deleteResult);
      expect(mockTaskRepository.delete).toHaveBeenCalledWith('1');
    });
  });
});
