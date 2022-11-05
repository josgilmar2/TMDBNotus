import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MoviesDetailsResponse } from '../models/interfaces/movies-details.interface';
import { MoviesVideosResponse } from '../models/interfaces/movies-videos.interface';
import { PopularMoviesResponse } from '../models/interfaces/popular-movies.interface';

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
  
}
