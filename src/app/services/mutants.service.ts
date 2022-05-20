import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Mutants } from '../Mutants';
import { Observable } from 'rxjs';

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
  private mixMutantsURL = 'http://localhost:3000/Mutants/?_embed=MutantPowers'

  constructor(private http: HttpClient) { }

  getMutants(): Observable<any[]> {
    return this.http.get<Mutants[]>(this.mixMutantsURL)
  }

  deleteMutant(mutant: Mutants): Observable<Mutants> {
    const url = `${this.mutantsURL}/${mutant.id}`;
    return this.http.delete<Mutants>(url);
  }

}
