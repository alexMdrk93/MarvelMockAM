import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Mutants } from 'src/app/Mutants';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-mutant',
  templateUrl: './add-mutant.component.html',
  styleUrls: ['./add-mutant.component.css']
})
export class AddMutantComponent implements OnInit {
  @Output() onAddMutant: EventEmitter<Mutants> = new EventEmitter();

  nume!: string;
  prenume!: string;
  numeDeErou!: string;
  numeSuper!: string;
  img!: string;
  subscription!: Subscription;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(!this.nume){
      alert('Please add details');
      return;
    }
  
    const newMutant = {
      nume: this.nume,
      prenume: this.prenume,
      numeDeErou: this.numeDeErou,
      numeSuper: this.numeSuper,
      img: this.img
    }
  
    this.onAddMutant.emit(newMutant);
  
    this.nume='';
    this.prenume='';
    this.numeDeErou='';
    this.numeSuper='';
    this.img=''
  
  }
  }