import { Test } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AuthController } from '../src/auth/auth.controller';
import { AuthService } from '../src/auth/auth.service';
import { UsersService } from '../src/users/users.service';
import { CreateUserDto } from '../src/users/dto/create-user.dto';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  const mockUsersService = {
    create: jest.fn(),
  };

  const mockAuthService = {
    signIn: jest.fn(),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
            provide: UsersService,
            useValue: mockUsersService
        },
        {
            provide: AuthService,
            useValue: mockAuthService
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('/POST auth/register', () => {
    it('should register a new user', async () => {
      const dto: CreateUserDto = { username: 'john', password: '1234' };
      const expected = { id: '1', username: dto.username };

      mockUsersService.create.mockResolvedValue(expected);

      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(dto)
        .expect(HttpStatus.CREATED);

      expect(response.body).toEqual(expected);
      expect(mockUsersService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('/POST auth/login', () => {
    it('should return access_token when login is successful', async () => {
      const dto: CreateUserDto = { username: 'john', password: '1234' };
      const expected = { access_token: 'fake-token' };

      mockAuthService.signIn.mockResolvedValue(expected);

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(dto)
        .expect(HttpStatus.OK);

      expect(response.body).toEqual(expected);
      expect(mockAuthService.signIn).toHaveBeenCalledWith(dto.username, dto.password);
    });
  });
});
