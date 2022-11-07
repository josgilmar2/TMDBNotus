import { Component, Input, OnInit } from '@angular/core';
import { RateMoviDto } from 'src/app/models/dto/rate-movie.dto';
import { PopularMovies } from 'src/app/models/interfaces/popular-movies.interface';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-one-movie',
  templateUrl: './one-movie.component.html',
  styleUrls: ['./one-movie.component.css']
})
export class OneMovieComponent implements OnInit {

  @Input() popularMovie: PopularMovies = {} as PopularMovies;
  @Input() pages: number = 0;
  session_id = false;
  showRating = false;
  rating: number = 0;
  movieRated = false;

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    if(localStorage.getItem('session_id') !== null) {
      this.session_id = true;
    }
  }

  showMoviesImg() {
    return `https://image.tmdb.org/t/p/w500${this.popularMovie.poster_path}`;
  }

  showRatingNumber(){
    this.showRating = !this.showRating;
  }

  sendRating() {
    let rateDto = new RateMoviDto();
    rateDto.value = this.rating;
    this.moviesService.rateMovie(rateDto, this.popularMovie.id).subscribe(res => {
      if(res.success) {
        alert('Tu valoración se ha guardado con éxito.')
        this.showRating = false;
        this.movieRated = true;
      }
    })
  }

  alreadyRated() {
    if(this.movieRated) {
      this.showRating = false;
      alert('Esta peli ya ha sido valorada. Si quieres cambiar o eliminar la valoración ve a la página MY RATED MOVIES');
    }
  }

}
