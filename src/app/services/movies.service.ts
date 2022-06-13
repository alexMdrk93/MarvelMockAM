import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movies } from '../Movies'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private moviesURL = 'http://localhost:3000/Movies';

  constructor(private http: HttpClient) { }

  getMovies(): Observable<any[]> {
    return this.http.get<any[]>(this.moviesURL)
  }

  deleteMovies(id:number): Observable<Movies> {
    const url = `${this.moviesURL}/${id}`;
    return this.http.delete<any>(url);
  }

  updateMovies(movie: Movies, id:number): Observable<Movies> {
    const url = `${this.moviesURL}/${id}`;
    return this.http.patch<Movies>(url, movie, httpOptions);
  }

  addMovies(movie: Movies): Observable<Movies> {
    return this.http.post<Movies>(this.moviesURL, movie, httpOptions);
  }
}

