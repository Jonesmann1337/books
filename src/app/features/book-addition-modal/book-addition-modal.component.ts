import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-addition-modal',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, FormsModule],
  templateUrl: './book-addition-modal.component.html',
  styleUrl: './book-addition-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookAdditionModalComponent {}
