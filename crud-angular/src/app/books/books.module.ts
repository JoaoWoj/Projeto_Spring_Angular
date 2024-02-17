import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books/books.component';


@NgModule({
  declarations: [
    BooksComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class BooksModule { }
