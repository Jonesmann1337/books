import { TestBed } from '@angular/core/testing';

import { BookService } from './book.service';
import { BookRestService } from './book-rest.service';
import { of } from 'rxjs';
import { Book } from '../models/book.model';
import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;

describe('BookService', () => {
  let service: BookService;
  let bookRestService: SpyObj<BookRestService>;

  beforeEach(() => {
    bookRestService = createSpyObj('BookRestService', ['getBooks']);

    TestBed.configureTestingModule({
      providers: [
        {
          provide: BookRestService,
          useValue: bookRestService
        }
      ]
    });
    service = TestBed.inject(BookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch books and return a list containing books grouped by decade and sorted by publishYear', () => {
    const unsortedBooks: Book[] = [
      {
        author: 'Author_01',
        category: 'Category_01',
        name: 'Book_01',
        publishYear: 1958,
        ratings: []
      },
      {
        author: 'Author_02',
        category: 'Category_02',
        name: 'Book_02',
        publishYear: 2014,
        ratings: []
      },
      {
        author: 'Author_03',
        category: 'Category_03',
        name: 'Book_03',
        publishYear: 2023,
        ratings: []
      },
      {
        author: 'Author_04',
        category: 'Category_04',
        name: 'Book_04',
        publishYear: 1998,
        ratings: []
      }
    ];
    bookRestService.getBooks.and.returnValue(of(unsortedBooks));
    service.getBooksGroupedByDecade().subscribe((booksByDecade) => {
      expect(booksByDecade[0]).toBe('2020s');
      expect((booksByDecade[1] as Book).publishYear).toBe(2023);
      expect(booksByDecade[2]).toBe('2010s');
      expect((booksByDecade[3] as Book).publishYear).toBe(2014);
      expect(booksByDecade[4]).toBe('2000s (No publications)');
      expect(booksByDecade[5]).toBe('1990s');
      expect((booksByDecade[6] as Book).publishYear).toBe(1998);
      expect(booksByDecade[7]).toBe('1980s – 1960s (No publications)');
      expect(booksByDecade[8]).toBe('1950s');
      expect((booksByDecade[9] as Book).publishYear).toBe(1958);
    });
    expect(bookRestService.getBooks).toHaveBeenCalledOnceWith();
  });

  it('should group books without a valid publishYear into a separate "No valid publish year" category', () => {
    const books: Book[] = [
      {
        author: 'Author_01',
        category: 'Category_01',
        name: 'Book_01',
        publishYear: '2024-10-10',
        ratings: []
      } as unknown as Book,
      {
        author: 'Author_02',
        category: 'Category_02',
        name: 'Book_02',
        publishYear: null,
        ratings: []
      } as unknown as Book
    ];
    bookRestService.getBooks.and.returnValue(of(books));
    service.getBooksGroupedByDecade().subscribe((booksByDecade) => {
      expect(booksByDecade[0]).toBe('No valid publish year');
      // @ts-ignore
      expect((booksByDecade[1] as Book).publishYear).toBe(null);
      // @ts-ignore
      expect((booksByDecade[2] as Book).publishYear).toEqual('2024-10-10');
    });
    expect(bookRestService.getBooks).toHaveBeenCalledOnceWith();
  });
});
