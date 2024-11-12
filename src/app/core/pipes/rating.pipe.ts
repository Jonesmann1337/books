import { Pipe, PipeTransform } from '@angular/core';
import { Rating } from '../models/book.model';

@Pipe({
  name: 'rating',
  standalone: true
})
export class RatingPipe implements PipeTransform {
  transform(ratings: Rating[]): unknown {
    return ratings.map<string>((rating) => `${rating.value} (${rating.source})`).join(', ');
  }
}
