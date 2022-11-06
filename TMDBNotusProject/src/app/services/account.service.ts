import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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
}
