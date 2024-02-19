import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Book } from '../model/book';
import { BooksService } from '../services/books.service';

@Injectable({
  providedIn: 'root'
})
export class BookResolver {
  constructor(private service: BooksService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Book> {
    if (route.params && route.params['id']) {
      return this.service.findById(route.params['id']);
    }

    return of({ _id: 0, title: '', author: '', isbn: '', publisher: '', rented: false, registration_date: new Date(), rent_date: new Date(), publicationYear: 0});
  }
}
