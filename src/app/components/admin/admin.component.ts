import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map, tap } from 'rxjs';
import { Mutants } from 'src/app/Mutants';
import { MutantsService } from 'src/app/services/mutants.service';
import { AddMutantComponent } from '../add-mutant/add-mutant.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})

export class AdminComponent implements OnInit {
  mutants: Mutants[] = [];
  title = 'Create mutant modal';

  constructor(private mutantService: MutantsService, private modalService: NgbModal) {}

  ngOnInit(): void {this.getMutants()}

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
    .subscribe((mutant) => this.mutants = mutant)
  }

  deleteMutants(mutant: Mutants) {
    this.mutantService.deleteMutants(mutant).subscribe(()=> (this.mutants = this.mutants.filter((m)=>m.id!==mutant.id)))
  }

  editMutants(mutant: Mutants){
    this.mutantService.updateMutants(mutant).subscribe()
  }

  addMutants(mutant: Mutants){
    this.mutantService.addMutant(mutant).subscribe((mutant)=>(this.mutants.push(mutant)))
  }

  openModal() {
    const modalRef = this.modalService.open(AddMutantComponent,
      {
        scrollable: false,
        centered: true
      });

    let data = {
      prop1: 'Some Data',
      prop2: 'From Parent Component',
      prop3: 'This Can be anything'
    }

    modalRef.componentInstance.fromParent = data;
    modalRef.result.then((result) => {
      console.log(result);
    }, (reason) => {
    });
  }

  columns = [
    {
      columnDef: 'position',
      header: 'No.',
      cell: (mutant: Mutants) => {
        console.log('cell function')
        return `${mutant.id}`
      } ,
    },
    {
      columnDef: 'name',
      header: 'Nume actor',
      cell: (mutant: Mutants) => `${mutant.nume} ${mutant.prenume}`,
    },
    {
      columnDef: 'erou',
      header: 'Nume erou',
      cell: (mutant: Mutants) => `${mutant.numeDeErou}`,
    },
    {
      columnDef: 'Xtra',
      header: 'Nume Super',
      cell: (mutant: Mutants) => `${mutant.numeSuper}`,
    },
  ];
  dataSource = this.mutants;
  displayedColumns = this.columns.map(c => c.columnDef);

  }

