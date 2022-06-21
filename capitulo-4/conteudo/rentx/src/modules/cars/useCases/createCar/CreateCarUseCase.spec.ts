import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateCarUseCase } from './CreateCarUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUserCase: CreateCarUseCase;

describe('Create car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUserCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUserCase.execute({
      name: 'Car name',
      description: 'Description car',
      daily_rate: 100,
      license_plate: 'ABC-9999',
      fine_amount: 50,
      brand: 'Car brand',
      category_id: 'category',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a new car with already used license_plate', async () => {
    expect(async () => {
      await createCarUserCase.execute({
        name: 'Car 1 name',
        description: 'Description car',
        daily_rate: 100,
        license_plate: 'ABC-9999',
        fine_amount: 50,
        brand: 'Car brand',
        category_id: 'category',
      });

      await createCarUserCase.execute({
        name: 'Car 2 name',
        description: 'Description car',
        daily_rate: 100,
        license_plate: 'ABC-9999',
        fine_amount: 50,
        brand: 'Car brand',
        category_id: 'category',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be available by default on create', async () => {
    const car = await createCarUserCase.execute({
      name: 'Car Available',
      description: 'Description car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 50,
      brand: 'Car brand',
      category_id: 'category',
    });

    expect(car.available).toBe(true);
  });
});
