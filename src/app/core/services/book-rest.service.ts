import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookRestService {
  private readonly httpClient = inject(HttpClient);
  private readonly baseUrl = 'https://63c10327716562671870f959.mockapi.io';

  getBooks() {
    return this.httpClient.get<Book[]>(`${this.baseUrl}/books`);
  }

  postBook(book: Book): Observable<void> {
    return this.httpClient.post<void>(`${this.baseUrl}/books`, book);
  }
}
