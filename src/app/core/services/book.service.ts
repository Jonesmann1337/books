import { inject, Injectable } from '@angular/core';
import { BookRestService } from './book-rest.service';
import { map, Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly bookRestService = inject(BookRestService);

  getBooks(): Observable<Book[]> {
    return this.bookRestService
      .getBooks()
      .pipe(map((books: Book[]) => this.sortByPublishYear(books)));
  }

  private sortByPublishYear(books: Book[]) {
    return books.sort((firstBook, secondBook) =>
      firstBook.publishYear < secondBook.publishYear || firstBook.publishYear === null ? 1 : -1
    );
  }
}
