import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MovieCreditsResponse } from '../models/interfaces/movie-credits.interface';
import { PersonDetailsResponse } from '../models/interfaces/person-details.interface';
import { PersonResponse } from '../models/interfaces/person.interface';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  constructor(private http: HttpClient) {}

  getPerson(page: number): Observable<PersonResponse> {
    return this.http.get<PersonResponse>(
      `${environment.apiBaseUrl}/person/popular?api_key=${environment.apiKey}&language=en-US&page=${page}`
    );
  }

  getDetails(id: string): Observable<PersonDetailsResponse> {
    return this.http.get<PersonDetailsResponse>(
      `${environment.apiBaseUrl}/person/${id}?api_key=${environment.apiKey}&language=en-US`
    );
  }

  getMovieCredits(id: string): Observable<MovieCreditsResponse>{
    return this.http.get<MovieCreditsResponse>(`${environment.apiBaseUrl}/person/${id}/movie_credits?api_key=${environment.apiKey}&language=en-US`
    );
  }
}
