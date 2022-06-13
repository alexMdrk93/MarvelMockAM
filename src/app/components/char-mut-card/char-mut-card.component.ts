import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-char-mut-card',
  templateUrl: './char-mut-card.component.html',
  styleUrls: ['./char-mut-card.component.css']
})
export class CharMutCardComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
