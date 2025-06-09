import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;
  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);

  const mockRepository = {
    save: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(USER_REPOSITORY_TOKEN);
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
    it('should hash the password and save the user', async () => {
      const dto: CreateUserDto = {
        username: 'testuser',
        password: 'plainPassword',
      };

      const hashedPassword = 'hashedPassword';
      const savedUser = {
        id: '1',
        username: dto.username,
        password: hashedPassword,
      };

      jest.spyOn(bcrypt, 'hash' as any).mockResolvedValue(hashedPassword);
      mockRepository.save.mockResolvedValue(savedUser);

      const result = await service.create({ ...dto });

      expect(bcrypt.hash).toHaveBeenCalledWith(dto.password, 8);
      expect(mockRepository.save).toHaveBeenCalledWith({
        username: dto.username,
        password: hashedPassword,
      });
      expect(result).toEqual(savedUser);
    });
  });

  describe('findByUsername', () => {
    it('should return a user if found', async () => {
      const user = { id: '1', username: 'testuser', password: 'hashed' };

      mockRepository.findOne.mockResolvedValue(user);

      const result = await service.findByUsername('testuser');
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { username: 'testuser' },
      });
      expect(result).toEqual(user);
    });

    it('should return null if user not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      const result = await service.findByUsername('nonexistent');
      expect(result).toBeNull();
    });
  });
});
