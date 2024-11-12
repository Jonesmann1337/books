import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BookListComponent } from './features/book-list/book-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BookService } from './core/services/book.service';
import { of } from 'rxjs';
import { Book } from './core/models/book.model';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let bookService: SpyObj<BookService>;

  beforeEach(async () => {
    bookService = createSpyObj('BookService', {
      getBooksGroupedByDecade: of<(string | Book)[]>([])
    });

    await TestBed.configureTestingModule({
      imports: [AppComponent],
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

  it('should load books grouped by decade', () => {
    expect(bookService.getBooksGroupedByDecade).toHaveBeenCalledOnceWith();
  });

  it('should show "Add a Book" button', () => {
    const addBookButton: HTMLButtonElement =
      fixture.nativeElement.querySelector('button.add-book-btn');
    expect(addBookButton.textContent).toBe('Add a Book');
  });

  it('should open the book addition modal', async () => {
    const addBookButton: HTMLButtonElement =
      fixture.nativeElement.querySelector('button.add-book-btn');
    addBookButton.click();
    await fixture.whenStable();
    const modal = document.querySelector('app-book-addition-modal');
    expect(modal).toBeTruthy();
  });
});
