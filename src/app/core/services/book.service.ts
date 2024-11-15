import { inject, Injectable } from '@angular/core';
import { BookRestService } from './book-rest.service';
import { map, Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly bookRestService = inject(BookRestService);

  addBook(book: Book) {
    return this.bookRestService.postBook(book);
  }

  getBooksGroupedByDecade(): Observable<(string | Book)[]> {
    return this.bookRestService
      .getBooks()
      .pipe(map((books: Book[]) => this.groupBooksByDecade(books)));
  }

  private groupBooksByDecade(books: Book[]): (string | Book)[] {
    const sortedBooks = this.sortByPublishYear(books);
    const groupedBooks = this.groupByDecade(sortedBooks);

    return this.createPublicationIntervals(groupedBooks, sortedBooks);
  }

  private sortByPublishYear(books: Book[]) {
    return books.sort((firstBook, secondBook) =>
      firstBook.publishYear < secondBook.publishYear ? 1 : -1
    );
  }

  private groupByDecade(sortedBooks: Book[]): Record<number, Book[]> {
    return sortedBooks.reduce<Record<number, Book[]>>((group, book) => {
      const decade = this.getDecade(book);
      group[decade] = group[decade] ?? [];
      group[decade].push(book);
      return group;
    }, {});
  }

  private getDecade(book: Book) {
    return Math.floor(book.publishYear / 10) * 10;
  }

  private createPublicationIntervals(groupedBooks: Record<number, Book[]>, sortedBooks: Book[]) {
    const latestDecade = this.getDecade(sortedBooks[0]);
    const oldestDecade = this.getDecade(sortedBooks[sortedBooks.length - 1]);

    const result: (string | Book)[] = [];
    let emptyDecadeStart: number | null = null;

    for (let decade = latestDecade; decade >= oldestDecade; decade -= 10) {
      if (groupedBooks[decade]) {
        if (emptyDecadeStart !== null) {
          result.push(
            emptyDecadeStart === decade + 10
              ? `${emptyDecadeStart}s (No publications)`
              : `${emptyDecadeStart}s – ${decade + 10}s (No publications)`
          );
          emptyDecadeStart = null;
        }
        result.push(`${decade}s`);
        result.push(...groupedBooks[decade]);
      } else if (emptyDecadeStart === null) {
        emptyDecadeStart = decade;
      }
    }

    return result;
  }
}
