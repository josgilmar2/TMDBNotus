import { Component, Input, OnInit } from '@angular/core';
import { RateMoviDto } from 'src/app/models/dto/rate-movie.dto';
import { RatedMovies } from 'src/app/models/interfaces/rated-movies.interface';
import { AccountService } from 'src/app/services/account.service';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-one-movie-rated',
  templateUrl: './one-movie-rated.component.html',
  styleUrls: ['./one-movie-rated.component.css']
})
export class OneMovieRatedComponent implements OnInit {

  @Input() ratedMovie: RatedMovies = {} as RatedMovies;
  @Input() pages: number = 0;
  session_id = false;
  showRating = false;
  rating: number = 0;

  constructor(private moviesService: MoviesService, private accountService: AccountService) { }

  ngOnInit(): void {
    if(localStorage.getItem('session_id') !== null) {
      this.session_id = true;
    }
  }

  showMoviesImg() {
    return `https://image.tmdb.org/t/p/w500${this.ratedMovie.poster_path}`;
  }

  showRatingNumber(){
    this.showRating = !this.showRating;
  }

  sendRating() {
    let rateDto = new RateMoviDto();
    rateDto.value = this.rating;
    this.moviesService.rateMovie(rateDto, this.ratedMovie.id).subscribe(res => {
      if(res.success) {
        alert('Tu valoración se ha guardado con éxito.')
        this.showRating = false;
        location.reload();
      }
    })
  }

  deleteRating() {
    this.moviesService.deleteRating(this.ratedMovie.id).subscribe(() => {
      alert('La valoración ha sido eliminada con éxito');
      this.showRating = false;
      location.reload();
    })
  }

}
