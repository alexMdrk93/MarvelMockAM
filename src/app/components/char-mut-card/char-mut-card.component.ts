import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Mutants } from 'src/app/Mutants';

@Component({
  selector: 'app-char-mut-card',
  templateUrl: './char-mut-card.component.html',
  styleUrls: ['./char-mut-card.component.css']
})
export class CharMutCardComponent implements OnInit {
  @Input()  mutant!: Mutants;
  @Output() delete: EventEmitter<Mutants> = new EventEmitter();
  @Output() edit: EventEmitter<Mutants> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onDelete() { 
    this.delete.emit(this.mutant)
  }

  onEdit() { 
    this.edit.emit(this.mutant)
  }

}
