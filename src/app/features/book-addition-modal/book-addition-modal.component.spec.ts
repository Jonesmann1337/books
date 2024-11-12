import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAdditionModalComponent } from './book-addition-modal.component';

describe('BookAdditionModalComponent', () => {
  let component: BookAdditionModalComponent;
  let fixture: ComponentFixture<BookAdditionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookAdditionModalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BookAdditionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show title', () => {
    expect(fixture.nativeElement.querySelector('h2').textContent).toBe('Add a Book');
  });

  it('should show cancel and add button', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button');
    expect(buttons[0].textContent).toBe('Cancel');
    expect(buttons[1].textContent).toBe('Add');
  });
});
