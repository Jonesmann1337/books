import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAdditionModalComponent } from './book-addition-modal.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('BookAdditionModalComponent', () => {
  let component: BookAdditionModalComponent;
  let fixture: ComponentFixture<BookAdditionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookAdditionModalComponent, NoopAnimationsModule]
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

  it('should show inputs with labels (AC.02.2)', () => {
    const inputs: HTMLInputElement[] = fixture.nativeElement.querySelectorAll('input');
    const labels: HTMLInputElement[] = fixture.nativeElement.querySelectorAll('mat-label');

    expect(inputs[0]).toBeTruthy();
    expect(labels[0].textContent).toBe('Title');
    expect(inputs[1]).toBeTruthy();
    expect(labels[1].textContent).toBe('Author');
    expect(inputs[2]).toBeTruthy();
    expect(labels[2].textContent).toBe('Publish year');
    expect(inputs[3]).toBeTruthy();
    expect(labels[3].textContent).toBe('Genre');
  });

  it('should set all inputs as required (AC.02.3)', () => {
    const inputs: HTMLInputElement[] = fixture.nativeElement.querySelectorAll('input');

    expect(inputs[0].getAttribute('aria-required')).toEqual('true');
    expect(inputs[1].getAttribute('aria-required')).toEqual('true');
    expect(inputs[2].getAttribute('aria-required')).toEqual('true');
    expect(inputs[3].getAttribute('aria-required')).toEqual('true');
  });
});
