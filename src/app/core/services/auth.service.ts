import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _httpClient: HttpClient = inject(HttpClient);

  loginIn(username: string, password: string): Observable<AuthResponse> {
    return this._httpClient.post<AuthResponse>('https://dummyjson.com/auth/login', {
      username,
      password
    })
  }
}
