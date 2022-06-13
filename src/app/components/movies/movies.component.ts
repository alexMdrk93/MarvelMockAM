import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Movies } from 'src/app/Movies';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: Movies[] =[];

  constructor(private moviesServ:MoviesService) { }

  ngOnInit(): void {this.getMovies()}

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
        }),
        tap(console.log)
    ).subscribe((movies) => {this.movies=movies, console.log(movies)})
  }

}
