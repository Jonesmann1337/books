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
    bookRestService = createSpyObj('BookRestService', ['getBooks', 'postBook']);

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

  it('should fetch books and return a list containing books grouped by decade and sorted by publishYear (AC.01.2 - AC.01.5)', () => {
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

  it('should trigger a http POST request to add a book', () => {
    const book: Book = {
      name: 'book_01',
      author: 'author_01',
      category: 'category_01',
      ratings: [],
      publishYear: 2024
    };

    service.addBook(book);
    expect(bookRestService.postBook).toHaveBeenCalledOnceWith(book);
  });
});
