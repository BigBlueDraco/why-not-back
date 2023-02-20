import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UsersModule } from '../users.module';
import { UsersService } from './users.service';
type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

describe('UsersService', () => {
  let service: UsersService;
  const userRepositoryMock: MockType<Repository<UserEntity>> = {
    createUser: jest.fn(),
    getOneUser: jest.fn(),
    getAllUsers: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: userRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('create', () => {
    it('should create a new customer', async () => {
      const UserDto: UserEntity = {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@email.com',
        password: 'password',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      userRepositoryMock.createUser.mockReturnValue(UserDto);
      const newCustomer = await service.createUser(UserDto);
      expect(newCustomer).toMatchObject(UserDto);
      expect(userRepositoryMock.createUser).toHaveBeenCalledWith(UserDto);
    });
  });
  describe('getAllUsers', () => {
    it('should get all users', async () => {
      const users: UserEntity[] = [
        {
          id: 1302,
          first_name: 'John',
          last_name: 'Doe',
          email: 'john.doe@email.com',
          password: 'password',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 75894,
          first_name: 'John2',
          last_name: 'Doe2',
          email: 'john2.doe@email.com',
          password: 'password2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      userRepositoryMock.getAllUsers.mockReturnValue(users);
      const foundUsers = await service.getAllUsers();
      expect(foundUsers).toContainEqual({
        id: 75894,
        first_name: 'John2',
        last_name: 'Doe2',
        email: 'john2.doe@email.com',
        password: 'password2',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      expect(userRepositoryMock.getAllUsers).toHaveBeenCalled();
    });
  });
});
