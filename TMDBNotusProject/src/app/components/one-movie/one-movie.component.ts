import { Component, Input, OnInit } from '@angular/core';
import { FavoriteMovieDto } from 'src/app/models/dto/favorite-movie.dto';
import { RateMoviDto } from 'src/app/models/dto/rate-movie.dto';
import { PopularMovies } from 'src/app/models/interfaces/popular-movies.interface';
import { AccountService } from 'src/app/services/account.service';
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

  constructor(private moviesService: MoviesService, private accountService: AccountService) { }

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

  marcarFavorito(){
    let favMovies = new FavoriteMovieDto();
    favMovies.media_type = 'movie';
    favMovies.media_id = this.popularMovie.id;
    favMovies.favorite = true;
    this.accountService.markAsFavorite(favMovies).subscribe((resp) =>{
      if(resp.success){
        alert('Tu pelicula se ha agregado a favoritos')
      }
    })
  }

}
