import { BooksService } from './../services/books.service';
import { Component, OnInit } from '@angular/core';
import { Book } from '../model/book';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit {

  books$: Observable<Book[]>;
  readonly displayedColumns = ['title', 'author', 'publisher', 'rented', 'action'];


  constructor(private booksService: BooksService,
    public dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute) {
    this.books$ = this.booksService.findAll();
  }

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty
  }

  refresh() {
    this.books$ = this.booksService.findAll();
  }

  onAdd(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onRentBook(book: Book, rented: boolean){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: `Tem certeza que deseja ${rented ? 'alugar' : 'devolver'}  esse livro?`,
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result){
        this.booksService.rentBook(book._id, rented).subscribe(
          () => {
            this.refresh();
            this.snackBar.open(`Livro ${rented ? 'alugado' : 'devolvido'} com sucesso.`, 'X', {duration: 5000, verticalPosition:'top', horizontalPosition: 'center'})
          },
          () => this.snackBar.open(`Erro ao ${rented ? 'alugar' : 'devolver'} livro.`, '', {duration: 5000})
        );
      }
    });
  }

  onView(book: Book){

  }

  onEdit(book: Book){
    this.router.navigate(['edit', book._id], {relativeTo: this.route});
  }

  onDelete(book: Book){

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse livro?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result){
        this.booksService.delete(book._id).subscribe(
          () => {
            this.refresh();
            this.snackBar.open('Livro removido com sucesso.', 'X', {duration: 5000, verticalPosition:'top', horizontalPosition: 'center'})
          },
          () => this.snackBar.open('Erro ao remover livro.', '', {duration: 5000})
        );
      }
    });
  }

}
