import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO } from './user-dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userId: string = '';

  constructor(private httpClient: HttpClient) {}

  subscribeToUser(userId: string): Observable<boolean> {
    return this.httpClient.post<boolean>(
      'http://localhost:8080/api/user/subscribe/' + userId,
      null
    );
  }

  unsubscribeToUser(userId: string): Observable<boolean> {
    return this.httpClient.post<boolean>(
      'http://localhost:8080/api/user/unsubscribe/' + userId,
      null
    );
  }

  registerUser() {
    this.httpClient
      .get('http://localhost:8080/api/user/register', { responseType: 'text' })
      .subscribe((data) => {
        this.userId = data;
      });
  }

  getUser(): Observable<UserDTO> {
    return this.httpClient.get<UserDTO>(
      'http://localhost:8080/api/user/' + this.getUserId()
    );
  }

  getUserById(userId: string): Observable<UserDTO> {
    return this.httpClient.get<UserDTO>(
      'http://localhost:8080/api/user/' + userId
    );
  }

  getUserId(): string {
    return this.userId;
  }
}
