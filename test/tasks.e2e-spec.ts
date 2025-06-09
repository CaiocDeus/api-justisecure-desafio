import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TasksService } from '../src/tasks/tasks.service';
import { AuthGuard } from '../src/shared/guards/auth.guard';
import { TaskStatus } from '../src/tasks/enums/task-status.enum';
import { CreateTaskDto } from '../src/tasks/dto/create-task.dto';
import { UpdateTaskDto } from '../src/tasks/dto/update-task.dto';
import { TasksController } from '../src/tasks/tasks.controller';

describe('TasksController (e2e)', () => {
  let app: INestApplication;
  const mockTasksService = {
    create: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
          {
            provide: TasksService,
            useValue: mockTasksService,
          }
        ],
      })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('/POST tasks', () => {
    it('should create a task', async () => {
      const dto: CreateTaskDto = { title: 'Task', description: 'Desc', status: TaskStatus.PENDING };
      const expected = { id: '1', ...dto };

      mockTasksService.create.mockReturnValue(expected);

      const response = await request(app.getHttpServer())
        .post('/tasks')
        .send(dto)
        .expect(HttpStatus.CREATED)
        .expect(expected);

      expect(response.body).toEqual(expected);
      expect(mockTasksService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('/GET tasks', () => {
    it('should return all tasks', async () => {
      const expected = [{ id: '1', title: 'Task', description: 'Desc', status: TaskStatus.PENDING }];
      mockTasksService.findAll.mockReturnValue(expected);

      const response = await request(app.getHttpServer())
        .get('/tasks')
        .expect(HttpStatus.OK)
        .expect(expected);

      expect(response.body).toEqual(expected);
    });
  });

  describe('/PATCH tasks/:id', () => {
    it('should update a task', () => {
      const id = '1';
      const dto: UpdateTaskDto = { title: 'Updated', status: TaskStatus.DONE };
      const result = { affected: 1 };
      mockTasksService.update.mockReturnValue(result);

      return request(app.getHttpServer())
        .patch(`/tasks/${id}`)
        .send(dto)
        .expect(HttpStatus.OK)
        .expect(result);
    });
  });

  describe('/DELETE tasks/:id', () => {
    it('should delete a task', () => {
      const id = '1';
      const result = { affected: 1 };
      mockTasksService.remove.mockReturnValue(result);

      return request(app.getHttpServer())
        .delete(`/tasks/${id}`)
        .expect(HttpStatus.OK)
        .expect(result);
    });
  });
});
