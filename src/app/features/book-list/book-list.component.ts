import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Book } from '../../core/models/book.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BookService } from '../../core/services/book.service';
import { MatTableModule } from '@angular/material/table';
import { RatingPipe } from '../../core/pipes/rating.pipe';

@Component({
  selector: 'app-book-list',
  standalone: true,
  templateUrl: './book-list.component.html',
  imports: [MatTableModule, RatingPipe],
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit {
  private readonly bookService = inject(BookService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly displayedColumns: (keyof Book)[] = [
    'name',
    'author',
    'category',
    'publishYear',
    'ratings'
  ];
  protected readonly books = signal<Book[]>([]);

  ngOnInit() {
    this.bookService
      .getBooks()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((books) => {
        this.books.set(books);
      });
  }
}
