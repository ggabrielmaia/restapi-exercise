import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const mockUserRepository = (): MockRepository => ({
  find: jest.fn(),
  findOneBy: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
});

describe('UserService', () => {
  let service: UserService;
  let repository: MockRepository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(User), useFactory: mockUserRepository },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<MockRepository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const user = { name: 'John Doe', email: 'john.doe@example.com', password: 'password123' } as User;
    repository.create.mockReturnValue(user);
    repository.save.mockResolvedValue(user);

    expect(await service.create(user)).toEqual(user);
  });

  it('should find all users', async () => {
    const users = [{ id: 1, name: 'John Doe', email: 'john.doe@example.com' }];
    repository.find.mockResolvedValue(users);

    expect(await service.findAll()).toEqual(users);
  });

  it('should find a user by id', async () => {
    const user = { id: 1, name: 'John Doe', email: 'john.doe@example.com' };
    repository.findOneBy.mockResolvedValue(user);

    expect(await service.findOne(1)).toEqual(user);
  });

  it('should update a user', async () => {
    const user = { id: 1, name: 'John Doe', email: 'john.doe@example.com' };
    repository.update.mockResolvedValue(user);
    repository.findOneBy.mockResolvedValue(user);

    await service.update(1, { name: 'John Smith', email: 'john.smith@example.com' } as User);

    expect(repository.update).toHaveBeenCalledWith(1, {
      name: 'John Smith',
      email: 'john.smith@example.com',
    });
    expect(await service.findOne(1)).toEqual(user);
  });

  it('should remove a user', async () => {
    repository.delete.mockResolvedValue({ affected: 1 });

    await service.remove(1);

    expect(repository.delete).toHaveBeenCalledWith(1);
  });
});
