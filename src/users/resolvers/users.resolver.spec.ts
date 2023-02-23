import { Test, TestingModule } from '@nestjs/testing';
import { UserEntity } from '../entities/user.entity';
import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';
import { UsersService } from '../services/users.service';
import { UsersResolver } from './users.resolver';

const usersMock = [
  {
    id: 1302,
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@email.com',
    password: 'password',
    createdAt: '2023-02-20T14:58:40.119Z',
    updatedAt: '2023-02-20T14:58:40.119Z',
  },
  {
    id: 75894,
    first_name: 'John2',
    last_name: 'Doe2',
    email: 'john2.doe@email.com',
    password: 'password2',
    createdAt: '2023-02-20T14:58:40.119Z',
    updatedAt: '2023-02-20T14:58:40.119Z',
  },
];
describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        {
          provide: UsersResolver,
          useFactory: () => ({
            createUser: jest.fn((user: CreateUserInput) => ({
              ...user,
            })),
            getOneUser: jest.fn(() => usersMock),
            getAllUsers: jest.fn(() => usersMock),
          }),
        },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
  describe('User', () => {
    it('should find and return a array of users', async () => {
      const users = await resolver.getAllUsers();
      expect(users).toEqual(usersMock);
    });
    it('should find user by id and return', async () => {
      const user = await resolver.getOneUser(usersMock[0].id);
      expect(user).toContainEqual(usersMock[0]);
    });
    it('should create user', async () => {
      const user = await resolver.createUser(usersMock[0]);
      expect(user).toEqual(usersMock[0]);
    });
  });
  describe('deleteUser', () => {
    it('should delete user by id and return the deleted user', async () => {
      const deletedUser = usersMock[0];
      jest.spyOn(service, 'removeUser').mockResolvedValueOnce(deletedUser.id);
      const result = await resolver.removeUser(deletedUser.id);
      expect(result).toEqual(deletedUser);
      expect(service.removeUser).toHaveBeenCalledWith(deletedUser.id);
    });
  });
});
