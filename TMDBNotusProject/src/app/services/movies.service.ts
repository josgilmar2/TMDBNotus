import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'process';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RateMoviDto } from '../models/dto/rate-movie.dto';
import { DeleteRatingResponse } from '../models/interfaces/delete-rating.interface';
import { MoviesDetailsResponse } from '../models/interfaces/movies-details.interface';
import { MoviesVideosResponse } from '../models/interfaces/movies-videos.interface';
import { PopularMoviesResponse } from '../models/interfaces/popular-movies.interface';
import { RateMovieResponse } from '../models/interfaces/rate-movie.interface';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  getPopular(pages: number): Observable<PopularMoviesResponse> {
    return this.http.get<PopularMoviesResponse>(
      `${environment.apiBaseUrl}/movie/popular?api_key=${environment.apiKey}&language=es-ES&page=${pages}`
    );
  }

  getDetails(id: number): Observable<MoviesDetailsResponse> {
    return this.http.get<MoviesDetailsResponse>(
      `${environment.apiBaseUrl}/movie/${id}?api_key=${environment.apiKey}&language=es-ES`
    );
  }

  getVideos(id: number): Observable<MoviesVideosResponse> {
    return this.http.get<MoviesVideosResponse>(
      `${environment.apiBaseUrl}/movie/${id}/videos?api_key=${environment.apiKey}&language=es-ES`
    );
  }

  rateMovie(rateMovieDto: RateMoviDto, id: number): Observable<RateMovieResponse> {
    return this.http.post<RateMovieResponse>(
      `${environment.apiBaseUrl}/movie/${id}/rating?api_key=${environment.apiKey}&session_id=${localStorage.getItem('session_id')}`, rateMovieDto
    )
  }

  deleteRating(id :number): Observable<DeleteRatingResponse> {
    return this.http.delete<DeleteRatingResponse>(
      `${environment.apiBaseUrl}/movie/${id}/rating?api_key=${environment.apiKey}&session_id=${localStorage.getItem('session_id')}`
    )
  }
}
