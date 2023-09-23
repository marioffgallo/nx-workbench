import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { CredentialsDto, UserDto } from '@nx-workbench/movies-lib';
import * as bcrypt from 'bcrypt';

// Mocks
const mockDatabaseService = {
  send: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn(),
};

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: ClientProxy, useValue: mockDatabaseService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('validateUser', () => {
    it('should validate a user with correct credentials', async () => {
      const credentials: CredentialsDto = {
        username: 'validUsername',
        password: 'validPassword',
        email: 'validEmail'
      };

      const hashedPassword = bcrypt.hashSync(credentials.password, 10);

      mockDatabaseService.send.mockResolvedValueOnce({
        username: credentials.username,
        password: hashedPassword,
      });

      const result = await authService.validateUser(credentials);

      expect(result).toEqual({
        username: credentials.username,
        password: hashedPassword,
      });
      expect(mockDatabaseService.send).toHaveBeenCalledWith(
        { cmd: 'findUsername' },
        credentials.username
      );
    });

    it('should return null for invalid credentials', async () => {
      const credentials: CredentialsDto = {
        username: 'invalidUsername',
        password: 'invalidPassword',
        email: 'validEmail'
      };

      mockDatabaseService.send.mockResolvedValueOnce(null);

      const result = await authService.validateUser(credentials);

      expect(result).toBeNull();
      expect(mockDatabaseService.send).toHaveBeenCalledWith(
        { cmd: 'findUsername' },
        credentials.username
      );
    });

    // Add more test cases as needed
  });

  // Add tests for the register and login methods in a similar manner

});