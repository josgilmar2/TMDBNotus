import { Component, Input, OnInit } from '@angular/core';
import { PopularMovies } from 'src/app/models/interfaces/popular-movies.interface';

@Component({
  selector: 'app-one-movie',
  templateUrl: './one-movie.component.html',
  styleUrls: ['./one-movie.component.css']
})
export class OneMovieComponent implements OnInit {

  @Input() popularMovie: PopularMovies = {} as PopularMovies;
  @Input() pages: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  showMoviesImg() {
    return `https://image.tmdb.org/t/p/w500${this.popularMovie.poster_path}`;
  }

}
