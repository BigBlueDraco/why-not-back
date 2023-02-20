import { Test, TestingModule } from '@nestjs/testing';
import { UserEntity } from '../entities/user.entity';
import { UsersResolver } from './users.resolver';

const invoice = {
  id: '1234',
  invoiceNo: 'INV-01',
  description: 'GSVBS Website Project',
  customer: {},
  paymentStatus: 'Paid',
  currency: 'NGN',
  taxRate: 5,
  taxAmount: 8000,
  subTotal: 160000,
  total: 168000,
  amountPaid: '0',
  outstandingBalance: 168000,
  issueDate: '2017-06-06',
  dueDate: '2017-06-20',
  note: 'Thank you for your patronage.',
  createdAt: '2017-06-06 11:11:07',
  updatedAt: '2017-06-06 11:11:07',
};
describe('UsersResolver', () => {
  let resolver: UsersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        {
          provide: UsersResolver,
          useFactory: () => ({
            createUser: jest.fn((user: UserEntity) => ({
              id: 1234,
              ...user,
            })),
            getAllUsers: jest.fn(() => [
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
            ]),
          }),
        },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
