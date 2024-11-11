import { RatingPipe } from './rating.pipe';

describe('RatingPipe', () => {
  const pipe = new RatingPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform ratings into a formatted string', () => {
    expect(pipe.transform([{ source: 'Amazon', value: 4 }])).toBe('4 (Amazon)');
    expect(
      pipe.transform([
        { source: 'Amazon', value: 4 },
        { source: 'Goodreads', value: 4.5 }
      ])
    ).toBe('4 (Amazon), 4.5 (Goodreads)');
  });
});
