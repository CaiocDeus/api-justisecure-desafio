import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  const mockUser = {
    id: '1',
    username: 'testuser',
    password: 'hashedPassword',
  };

  const usersServiceMock = {
    findByUsername: jest.fn(),
  };

  const jwtServiceMock = {
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: usersServiceMock
        },
        {
          provide: JwtService,
          useValue: jwtServiceMock
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  it('should be defined', () => {
    expect(jwtService).toBeDefined();
  });

  describe('signIn', () => {
    it('should throw UnauthorizedException if user is not found', async () => {
      usersServiceMock.findByUsername.mockResolvedValue(null);

      await expect(authService.signIn('invalidUser', 'anyPass'))
        .rejects
        .toThrow(UnauthorizedException);

      expect(usersServiceMock.findByUsername).toHaveBeenCalledWith('invalidUser');
    });

    it('should throw UnauthorizedException if password is incorrect', async () => {
      usersServiceMock.findByUsername.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare' as any).mockResolvedValue(false);

      await expect(authService.signIn('testuser', 'wrongPassword'))
        .rejects
        .toThrow(UnauthorizedException);

      expect(bcrypt.compare).toHaveBeenCalledWith('wrongPassword', mockUser.password);
    });

    it('should return access_token if credentials are valid', async () => {
      usersServiceMock.findByUsername.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare' as any).mockResolvedValue(true);
      jwtServiceMock.signAsync.mockResolvedValue('fake-jwt-token');

      const result = await authService.signIn('testuser', 'correctPassword');

      expect(result).toEqual({ access_token: 'fake-jwt-token' });
      expect(jwtServiceMock.signAsync).toHaveBeenCalledWith({
        sub: mockUser.id,
        username: mockUser.username,
      });
    });
  });
});
