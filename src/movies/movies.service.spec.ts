import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    service.create({ title: 'Test Movie', genres: ['test'], year: 2000 });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a movie ', () => {
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should throw a 404 error', () => {
      try {
        service.getOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  /*   describe('update', () => {
    it('should update a movie', () => {
      service.update(1, { title: 'Updated test' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Updated test');
    });
    it('should throw a NotFoundException', () => {
      try {
        service.update(99, { title: 'Updated test' });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  }); */
});
