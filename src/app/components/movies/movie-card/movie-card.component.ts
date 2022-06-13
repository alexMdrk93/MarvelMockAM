import { Component, Input, OnInit } from '@angular/core';
import { Movies } from 'src/app/Movies';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {
  @Input() movie !:Movies;

  constructor() { }

  ngOnInit(): void {
  }

}
