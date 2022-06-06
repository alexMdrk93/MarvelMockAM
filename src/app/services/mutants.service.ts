import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mutants } from '../Mutants';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class MutantsService { 
  private mutantsURL = 'http://localhost:3000/Mutants'
  private mutantPowersURL = 'http://localhost:3000/Mutants/?_embed=MutantPowers'

  constructor(private http: HttpClient) { }

  getMutants(): Observable<any[]> {
    return this.http.get<any[]>(this.mutantPowersURL)
  }

  deleteMutants(id:number): Observable<Mutants> {
    const url = `${this.mutantsURL}/${id}`;
    return this.http.delete<any>(url);
  }

  updateMutants(mutant: Mutants, id:number): Observable<Mutants> {
    const url = `${this.mutantsURL}/${id}`;
    return this.http.patch<Mutants>(url, mutant, httpOptions);
  }

  addMutant(mutant: Mutants): Observable<Mutants> {
    return this.http.post<Mutants>(this.mutantsURL, mutant, httpOptions);
  }

}
