import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { map, tap } from 'rxjs';
import { Mutants } from 'src/app/Mutants';
import { Movies } from 'src/app/Movies';
import { MutantsService } from 'src/app/services/mutants.service';
import { MoviesService } from 'src/app/services/movies.service';
import { AddMutantComponent } from '../add-mutant/add-mutant.component';
import { MatDialog } from '@angular/material/dialog';
import { ThemePalette } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CharMutCardComponent } from '../char-mut-card/char-mut-card.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieCardComponent } from '../movies/movie-card/movie-card.component';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})

export class AdminComponent implements OnInit {
  @Input() backgroundColor: ThemePalette;
  @Input() color: ThemePalette;
  mutants: Mutants[] = [];
  movies: Movies[] =[];
  displayedColumns: string[] = ['nume', 'prenume', 'numeDeErou', 'numeSuper', 'Actiuni'];
  dataSource!: MatTableDataSource<Mutants>;
  @ViewChild('paginatorMutant', {static: true})   paginatorMutant!: MatPaginator;
  @ViewChild('sortMutant', {static: true})  sortMutant!: MatSort;
  displayedColumnsM: string[] = ['title', 'director', 'date', 'duration', 'Actiuni'];
  dataSourceM!: MatTableDataSource<Movies>;
  @ViewChild('paginatorMovie', {static: true})   paginatorMovie!: MatPaginator;
  @ViewChild('sortMovie', {static: true})  sortMovie!: MatSort;
  

  constructor(private mutantService: MutantsService, public dialog: MatDialog, private snackBar: MatSnackBar, private moviesServ:MoviesService) {}

  ngOnInit(): void {this.getMutants(); this.getMovies()}

  addMutants(mutant: Mutants){
    this.mutantService.addMutant(mutant).subscribe((mutant)=>(this.mutants.push(mutant)))
  }
  
  getMutants(){
    this.mutantService.getMutants().pipe(
      map(mutants => { 
        return mutants.map(
          (mutant) =>({
            id: mutant.id,
            nume: mutant.nume,
            prenume: mutant.prenume,
            numeDeErou: mutant.numeDeErou,
            numeSuper: mutant.MutantPowers[0].numeSuper,
            img: mutant.img
          }),
          )
        }),
        tap(console.log)
    )
    .subscribe((mutant) => {this.mutants = mutant; this.dataSource = new MatTableDataSource(mutant); this.dataSource.paginator = this.paginatorMutant; this.dataSource.sort = this.sortMutant})
  }

  editMutants(row:any){
    this.dialog.open(AddMutantComponent,{
      width: '30%',
      data:row
    }).afterClosed().subscribe(val => {
      if(val === 'update'){
        this.getMutants();
      }
     });
  }

  deleteMutant(id: number){
    this.mutantService.deleteMutants(id).subscribe({
      next: (res)=>{
        this.openSnackBar("Eroul a fost sters cu succes", "Inchide");
      },
      error: ()=>{
        this.openSnackBar("Eroare la stergere erou", "Inchide")
      },
      complete: ()=>{
        this.getMutants()
      }
    });
  }

  showMutants(row:any){
    this.dialog.open(CharMutCardComponent,{
      width: '40%',
      data:row
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddMutantComponent, {
      width: '30%'
    });

    dialogRef.afterClosed().subscribe(val => {
     if(val === 'save'){
       this.getMutants();
     }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  applyFilterMutant(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addMovies(movie: Movies){
    this.moviesServ.addMovies(movie).subscribe((movie)=>(this.movies.push(movie)))
  }

  getMovies(){
    this.moviesServ.getMovies().pipe(
      map(movies => { 
        return movies.map(
          (movie) =>({
            id: movie.id,
            title: movie.title,
            img: movie.img,
            trailer: movie.trailer,
            side: movie.side,
            director: movie.director,
            duration: movie.duration,
            genre: movie.genre,
            description: movie.description,
            date: movie.date
          }),
          )
        })
    ).subscribe((movie) => {this.movies = movie; this.dataSourceM = new MatTableDataSource(movie); this.dataSourceM.paginator = this.paginatorMovie; this.dataSourceM.sort = this.sortMovie})
  }

  showMovies(row:any){
    this.dialog.open(MovieCardComponent,{
      width: '40%',
      data:row
    });
  }


  applyFilterMovie(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceM.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceM.paginator) {
      this.dataSourceM.paginator.firstPage();
    }
  }
  
  }

