import { TestBed } from '@angular/core/testing';

import { BookRestService } from './book-rest.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Book } from '../models/book.model';

describe('BookRestService', () => {
  let service: BookRestService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(BookRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should GET books from correct REST endpoint (AC.01.1)', () => {
    const httpGetSpy = spyOn(httpClient, 'get').and.returnValue(of([]));

    service.getBooks().subscribe(() => {
      expect(httpGetSpy).toHaveBeenCalledOnceWith(
        'https://63c10327716562671870f959.mockapi.io/books'
      );
    });
  });

  it('should POST books to correct REST endpoint (AC.02.5)', () => {
    const httpPostSpy = spyOn(httpClient, 'post').and.returnValue(of(undefined));
    const book: Book = {
      name: 'book_01',
      author: 'author_01',
      category: 'category_01',
      ratings: [],
      publishYear: 2024
    };

    service.postBook(book).subscribe(() => {
      expect(httpPostSpy).toHaveBeenCalledOnceWith(
        'https://63c10327716562671870f959.mockapi.io/books',
        book
      );
    });
  });
});
