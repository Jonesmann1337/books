import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal
} from '@angular/core';
import { BookListComponent } from './features/book-list/book-list.component';
import { BookService } from './core/services/book.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Book } from './core/models/book.model';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { BookAdditionModalComponent } from './features/book-addition-modal/book-addition-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BookListComponent, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  private readonly bookService = inject(BookService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly dialog = inject(MatDialog);
  protected readonly booksByDecade = signal<(string | Book)[]>([]);

  ngOnInit() {
    this.refreshBooks();
  }

  private refreshBooks() {
    this.bookService
      .getBooksGroupedByDecade()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((books) => {
        this.booksByDecade.set(books);
      });
  }

  openModal() {
    this.dialog.open(BookAdditionModalComponent);
  }
}
