import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateSessionDto } from '../models/dto/create-session.dto';
import { DeleteSessionDto } from '../models/dto/detete-sesison.dto';
import { CreateSessionResponse } from '../models/interfaces/create-session.interface';
import { DeleteSessionResponse } from '../models/interfaces/delete-session.interface';
import { RequestTokenResponse } from '../models/interfaces/request-token.interface';
import { UserResponse } from '../models/interfaces/user-details.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  createRequestToken(): Observable<RequestTokenResponse> {
    return this.http.get<RequestTokenResponse>(
      `${environment.apiBaseUrl}/authentication/token/new?api_key=${environment.apiKey}`
    );
  }

  createSession(
    sessionDto: CreateSessionDto
  ): Observable<CreateSessionResponse> {
    return this.http.post<CreateSessionResponse>(
      `${environment.apiBaseUrl}/authentication/session/new?api_key=${environment.apiKey}`,
      sessionDto
    );
  }

  getInfo(): Observable<UserResponse>{
    return this.http.get<UserResponse>(`${environment.apiBaseUrl}/account?api_key=${environment.apiKey}&session_id=${localStorage.getItem('session_id') }`);
  }

  deleteSession(
    deleteSessionDto: DeleteSessionDto
  ): Observable<DeleteSessionResponse> {
    return this.http.request<DeleteSessionResponse>('delete',`${environment.apiBaseUrl}/authentication/session?api_key=${environment.apiKey}`, {body: deleteSessionDto});
  }
}