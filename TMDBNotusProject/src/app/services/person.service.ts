import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PersonDetailsResponse } from '../models/interfaces/person-details.interface';
import { Person, PersonResponse } from '../models/interfaces/person.interface';

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

}
