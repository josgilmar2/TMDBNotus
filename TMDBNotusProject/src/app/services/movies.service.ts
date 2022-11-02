import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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
}
