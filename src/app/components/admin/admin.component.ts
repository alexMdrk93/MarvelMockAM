import { Component, Input, OnInit } from '@angular/core';
import { tap, map } from 'rxjs';
import { Mutants } from 'src/app/Mutants';
import { MutantsService } from 'src/app/services/mutants.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
 @Input() mutants: Mutants[] = [];

  constructor(private mutantsService: MutantsService) {}

  ngOnInit(): void {}

  getMutants(){
    this.mutantsService.getMutants().subscribe((mutants)=> (this.mutants = mutants),()=>console.warn('defect'),()=>console.log(this.mutants))
    this.mutantsService.getMutants()
    .pipe(
      tap(res => console.log('before', res)),
      map(mutants => { 
        return mutants.map(
          (mutant) => ({
            id: mutant.id,
            nume: mutant.nume,
            prenume: mutant.prenume,
            numeDeErou: mutant.numeDeErou,
            numeSuper: mutant.MutantPowers[0].numeSuper,
            img: mutant.img
          })
        )
      }),
      tap(res => console.log('after', res))
    )
    .subscribe((mutants) => this.mutants = mutants)
  }

  deleteMutant(mutant: Mutants){
    this.mutantsService
      .deleteMutant(mutant)
      .subscribe(() => (this.mutants = this.mutants.filter((h) => h.id !== mutant.id)))
  }
  
  }

