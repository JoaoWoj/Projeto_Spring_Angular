import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Book } from '../model/book';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { BooksService } from './../services/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
})
export class BooksComponent implements OnInit {
  panelOpenState = false;
  books$: Observable<Book[]>;
  readonly displayedColumns = [
    'title',
    'author',
    'publisher',
    'rented',
    'action',
  ];

  filter = this.formBuilder.group({
    _id: 0,
    title: [''],
    author: [''],
    isbn: [''],
    publisher: [''],
    rented: [''],
    publicationYear: []
  });

  constructor(
    private formBuilder: FormBuilder,
    private booksService: BooksService,
    public dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.books$ = this.booksService.findAll();
  }

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty
  }

  refresh() {
    this.books$ = this.booksService.findAll();
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onRentBook(book: Book, rented: boolean) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: `Tem certeza que deseja ${
        rented ? 'alugar' : 'devolver'
      }  esse livro?`,
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.booksService.rentBook(book._id, rented).subscribe(
          () => {
            this.onRefreshFilter();
            this.snackBar.open(
              `Livro ${rented ? 'alugado' : 'devolvido'} com sucesso.`,
              'X',
              {
                duration: 5000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
              }
            );
          },
          () =>
            this.snackBar.open(
              `Erro ao ${rented ? 'alugar' : 'devolver'} livro.`,
              '',
              { duration: 5000 }
            )
        );
      }
    });
  }

  onView(book: Book) {
    this.router.navigate(['view', book._id], { relativeTo: this.route });
  }

  onEdit(book: Book) {
    if (book.rented) {
      this.dialog.open(ConfirmationDialogComponent, {
        data: 'Não é possível editar um livro que esteja alugado!',
      });
    } else {
      this.router.navigate(['edit', book._id], { relativeTo: this.route });
    }
  }

  onDelete(book: Book) {
    if (book.rented) {
      this.dialog.open(ConfirmationDialogComponent, {
        data: 'Não é possível remover um livro que esteja alugado!',
      });
    } else {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: 'Tem certeza que deseja remover esse livro?',
      });

      dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result) {
          this.booksService.delete(book._id).subscribe(
            () => {
              this.onRefreshFilter();
              this.snackBar.open('Livro removido com sucesso.', 'X', {
                duration: 5000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
              });
            },
            () =>
              this.snackBar.open('Erro ao remover livro.', '', {
                duration: 5000,
              })
          );
        }
      });
    }
  }

  onFilter() {
    const { author, isbn, publicationYear, publisher, title, rented } = this.filter.value;
    let rentedBoolean: boolean | undefined;
    if (rented === 'true') {
      rentedBoolean = true;
    } else if (rented === 'false') {
      rentedBoolean = false;
    } else {
      rentedBoolean = undefined; // Define como undefined se o valor de rented for vazio
    }
    this.refresh();
    this.books$ = this.books$.pipe(
      map(books => {
        return books.filter(book => {
          return (!author || book.author.toLowerCase() === author.toLowerCase()) &&
                 (!isbn || book.isbn.toLowerCase() === isbn.toLowerCase()) &&
                 (!publicationYear || book.publicationYear === publicationYear) &&
                 (!publisher || book.publisher.toLowerCase() === publisher.toLowerCase()) &&
                 (!title || book.title.toLowerCase() === title.toLowerCase()) &&
                 (rentedBoolean === undefined || book.rented === rentedBoolean);
        });
      })
    );
  }

  onRefreshFilter(){
    this.filter = this.formBuilder.group({
      _id: 0,
      title: [''],
      author: [''],
      isbn: [''],
      publisher: [''],
      rented: [''],
      publicationYear: []
    });
    this.refresh();
  }

}

