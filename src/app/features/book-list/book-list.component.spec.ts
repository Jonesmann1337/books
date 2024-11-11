import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListComponent } from './book-list.component';
import { of } from 'rxjs';
import { Book } from '../../core/models/book.model';
import { BookService } from '../../core/services/book.service';
import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  let bookService: SpyObj<BookService>;

  beforeEach(async () => {
    bookService = createSpyObj('BookService', {
      getBooks: of<Book[]>([])
    });

    await TestBed.configureTestingModule({
      imports: [BookListComponent],
      providers: [
        {
          provide: BookService,
          useValue: bookService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display a table header', () => {
    fixture.detectChanges();

    const tHeadList: HTMLTableCellElement[] = fixture.nativeElement.querySelectorAll('thead tr th');
    expect(tHeadList.length).toBe(5);
    expect(tHeadList[0].textContent).toBe('Name');
    expect(tHeadList[1].textContent).toBe('Author');
    expect(tHeadList[2].textContent).toBe('Category');
    expect(tHeadList[3].textContent).toBe('Publish year');
    expect(tHeadList[4].textContent).toBe('Ratings');
  });

  it('should display a message, when the list of books is empty', () => {
    fixture.detectChanges();

    const columnElement: HTMLTableColElement = fixture.nativeElement.querySelector('tbody > tr td');
    expect(columnElement.textContent).toBe('No books to display.');
    expect(columnElement.getAttribute('colspan')).toBe('5');
  });

  it('should display a table containing all books', () => {
    bookService.getBooks.and.returnValue(
      of([
        {
          name: `Harry Potter and the Sorcerer's Stone`,
          author: 'Joanne K. Rowling',
          category: 'Fantasy',
          ratings: [{ source: 'Goodreads', value: 5 }],
          publishYear: 1997
        }
      ])
    );
    fixture.detectChanges();

    const rows: HTMLTableRowElement[] = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(1);

    const firstRow = rows[0];
    expect(firstRow.children[0].textContent).toBe(`Harry Potter and the Sorcerer's Stone`);
    expect(firstRow.children[1].textContent).toBe('Joanne K. Rowling');
    expect(firstRow.children[2].textContent).toBe('Fantasy');
    expect(firstRow.children[3].textContent).toBe('1997');
    expect(firstRow.children[4].textContent).toBe('5 (Goodreads)');
  });
});
