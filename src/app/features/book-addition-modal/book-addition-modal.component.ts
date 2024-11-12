import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Book } from '../../core/models/book.model';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-book-addition-modal',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, FormsModule, MatFormField, MatInput, MatLabel],
  templateUrl: './book-addition-modal.component.html',
  styleUrl: './book-addition-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookAdditionModalComponent {
  protected readonly book = model<Book>({
    name: '',
    publishYear: 2024,
    ratings: [],
    category: '',
    author: ''
  });
}
