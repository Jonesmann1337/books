import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Book } from '../../core/models/book.model';
import { MatTableModule } from '@angular/material/table';
import { RatingPipe } from '../../core/pipes/rating.pipe';

@Component({
  selector: 'app-book-list',
  standalone: true,
  templateUrl: './book-list.component.html',
  imports: [MatTableModule, RatingPipe],
  styleUrl: './book-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookListComponent {
  protected readonly displayedColumns: (keyof Book)[] = [
    'name',
    'author',
    'category',
    'publishYear',
    'ratings'
  ];
  readonly booksByDecade = input.required<(string | Book)[]>();

  protected isDecade(_: number, row: string | Book): row is string {
    return typeof row === 'string';
  }
}
