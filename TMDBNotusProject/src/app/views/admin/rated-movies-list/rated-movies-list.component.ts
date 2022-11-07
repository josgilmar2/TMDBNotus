import { Component, OnInit } from '@angular/core';
import { RatedMovies } from 'src/app/models/interfaces/rated-movies.interface';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-rated-movies-list',
  templateUrl: './rated-movies-list.component.html',
  styleUrls: ['./rated-movies-list.component.css']
})
export class RatedMoviesListComponent implements OnInit {

  ratedMoviesList: RatedMovies[] = [];
  numTotalPages: number = 0;
  actualPage: number = 1;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.getRatedMoviesMovies(this.actualPage);
  }

  getRatedMoviesMovies(page: number) {
    this.accountService.getRatedMovies(page).subscribe(res => {
      this.ratedMoviesList = res.results;
      this.numTotalPages = Math.ceil(res.total_pages / 10);
    })
  }

  pageBefore() {
    if (this.actualPage > 1) {
      this.actualPage = this.actualPage - 1;
      this.accountService.getRatedMovies(this.actualPage).subscribe(res => {
        this.ratedMoviesList = res.results;
        this.numTotalPages = Math.ceil(res.total_pages / 10);
      })
    }
  }

  pageAfter() {
    if (this.actualPage < this.numTotalPages) {
      this.actualPage = this.actualPage + 1;
      this.accountService.getRatedMovies(this.actualPage).subscribe(res => {
        this.ratedMoviesList = res.results;
        this.numTotalPages = Math.ceil(res.total_pages / 10);
      })
    }
  }

}
