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

  it('should fetch books and return all books sorted by publishYear', () => {
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
    service.getBooks().subscribe((books) => {
      expect(books[0].publishYear).toBe(2023);
      expect(books[1].publishYear).toBe(2014);
      expect(books[2].publishYear).toBe(1998);
      expect(books[3].publishYear).toBe(1958);
    });
    expect(bookRestService.getBooks).toHaveBeenCalledOnceWith();
  });
});
