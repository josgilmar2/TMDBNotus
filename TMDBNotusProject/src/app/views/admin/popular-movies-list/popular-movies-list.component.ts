import { Component, OnInit } from '@angular/core';
import { PopularMovies } from 'src/app/models/interfaces/popular-movies.interface';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-popular-movies-list',
  templateUrl: './popular-movies-list.component.html',
  styleUrls: ['./popular-movies-list.component.css']
})
export class PopularMoviesListComponent implements OnInit {

  popularMoviesList: PopularMovies[] = [];
  numTotalPages: number = 0;
  actualPage: number = 1;

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.getPopularMovies(this.actualPage);
  }

  getPopularMovies(page: number) {
    this.moviesService.getPopular(page).subscribe(res => {
      this.popularMoviesList = res.results;
      this.numTotalPages = Math.ceil(res.total_pages / 10);
    })
  }

  pageBefore() {
    if (this.actualPage > 1) {
      this.actualPage = this.actualPage - 1;
      this.moviesService.getPopular(this.actualPage).subscribe(res => {
        this.popularMoviesList = res.results;
        this.numTotalPages = Math.ceil(res.total_pages / 10);
      })
    }
  }

  pageAfter() {
    if (this.actualPage < this.numTotalPages) {
      this.actualPage = this.actualPage + 1;
      this.moviesService.getPopular(this.actualPage).subscribe(res => {
        this.popularMoviesList = res.results;
        this.numTotalPages = Math.ceil(res.total_pages / 10);
      })
    }
  }

}
