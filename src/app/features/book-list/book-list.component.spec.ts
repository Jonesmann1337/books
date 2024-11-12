import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListComponent } from './book-list.component';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('booksByDecade', []);
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
    expect(columnElement.textContent).toBe('No books available');
    expect(columnElement.getAttribute('colspan')).toBe('5');
  });

  it('should display a table containing all books grouped by decade (AC.01.2)', () => {
    fixture.componentRef.setInput('booksByDecade', [
      '1990s',
      {
        name: `Harry Potter and the Sorcerer's Stone`,
        author: 'Joanne K. Rowling',
        category: 'Fantasy',
        ratings: [{ source: 'Goodreads', value: 5 }],
        publishYear: 1997
      }
    ]);
    fixture.detectChanges();

    const rows: HTMLTableRowElement[] = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(2);

    const decadeRow = rows[0];
    const bookRow = rows[1];
    expect(decadeRow.children[0].textContent).toBe(`1990s`);
    expect(bookRow.children[0].textContent).toBe(`Harry Potter and the Sorcerer's Stone`);
    expect(bookRow.children[1].textContent).toBe('Joanne K. Rowling');
    expect(bookRow.children[2].textContent).toBe('Fantasy');
    expect(bookRow.children[3].textContent).toBe('1997');
    expect(bookRow.children[4].textContent).toBe('5 (Goodreads)');
  });
});
