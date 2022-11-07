import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FavoriteMovieDto } from '../models/dto/favorite-movie.dto';
import { CreateFavMoviesResponse } from '../models/interfaces/create-fav-movies.interface';
import { FavoriteMoviesResponse } from '../models/interfaces/favorite-movies.interface';
import { RatedMoviesResponse } from '../models/interfaces/rated-movies.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  getRatedMovies(pages: number): Observable<RatedMoviesResponse> {
    return this.http.get<RatedMoviesResponse>(
      `${environment.apiBaseUrl}/account/${localStorage.getItem('account_id')}/rated/movies?api_key=${environment.apiKey}&language=es-ES&page=${pages}&session_id=${localStorage.getItem('session_id')}`
    );
  }

  getFavoriteMovies(page: number): Observable<FavoriteMoviesResponse>{
    return this.http.get<FavoriteMoviesResponse>(`${environment.apiBaseUrl}/account/${localStorage.getItem('account_id')}/favorite/movies?api_key=${environment.apiKey}&session_id=${localStorage.getItem('session_id') }&page=${page}`
    );
  }

  markAsFavorite(favoriteDto: FavoriteMovieDto): Observable<CreateFavMoviesResponse>{
    return this.http.post<CreateFavMoviesResponse>(`${environment.apiBaseUrl}/account/${localStorage.getItem('account_id')}/favorite?api_key=${environment.apiKey}&session_id=${localStorage.getItem('session_id') }`
    , favoriteDto
    );
  }
}
