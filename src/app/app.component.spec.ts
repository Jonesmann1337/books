import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BookListComponent } from './features/book-list/book-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BookService } from './core/services/book.service';
import { of, Subject } from 'rxjs';
import { Book } from './core/models/book.model';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog } from '@angular/material/dialog';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let bookService: SpyObj<BookService>;

  beforeEach(async () => {
    bookService = createSpyObj('BookService', {
      getBooksGroupedByDecade: of<(string | Book)[]>([]),
      addBook: of(undefined)
    });

    await TestBed.configureTestingModule({
      imports: [AppComponent, NoopAnimationsModule],
      providers: [
        {
          provide: BookService,
          useValue: bookService
        }
      ]
    })
      .overrideComponent(AppComponent, {
        remove: { imports: [BookListComponent] },
        add: { schemas: [CUSTOM_ELEMENTS_SCHEMA] }
      })
      .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should show the title', () => {
    expect(fixture.nativeElement.querySelector('h3')?.textContent).toContain('List of books');
  });

  it('should load books grouped by decade (AC.01.1)', () => {
    expect(bookService.getBooksGroupedByDecade).toHaveBeenCalledOnceWith();
  });

  it('should show "Add a Book" button (AC.02.1)', () => {
    const addBookButton: HTMLButtonElement =
      fixture.nativeElement.querySelector('button.add-book-btn');
    expect(addBookButton.textContent).toBe('Add a Book');
  });

  it('should open the book addition modal (AC.02.1)', () => {
    const addBookButton: HTMLButtonElement =
      fixture.nativeElement.querySelector('button.add-book-btn');
    addBookButton.click();
    const modal = document.querySelector('app-book-addition-modal');
    expect(modal).toBeTruthy();
  });

  it(`should add a book and refresh books, when the dialog closes and emits a book (AC.02.5)`, () => {
    const dialogClosed = new Subject<Book | undefined>();
    const book: Book = {
      name: 'book_01',
      author: 'author_01',
      publishYear: 2024,
      category: 'cat_01',
      ratings: []
    };
    spyOn(TestBed.inject(MatDialog), 'open').and.returnValue(
      createSpyObj('MatDialog', { afterClosed: dialogClosed })
    );

    component.openModal();
    dialogClosed.next(book);
    expect(bookService.addBook).toHaveBeenCalledOnceWith(book);
    expect(bookService.getBooksGroupedByDecade).toHaveBeenCalledTimes(2);
  });

  it(`should neither add a new book nor refresh books, when the dialog closes without emitting a boo`, () => {
    const dialogClosed = new Subject<Book | undefined>();
    spyOn(TestBed.inject(MatDialog), 'open').and.returnValue(
      createSpyObj('MatDialog', { afterClosed: dialogClosed })
    );

    component.openModal();
    dialogClosed.next(undefined);
    expect(bookService.addBook).not.toHaveBeenCalled();
    expect(bookService.getBooksGroupedByDecade).toHaveBeenCalledOnceWith();
  });
});
