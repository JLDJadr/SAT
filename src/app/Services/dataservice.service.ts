import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { UserDTO } from '../Models/user.dto';
import { RequestDTO } from '../Models/request.dto';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private mockUrl: string

  constructor(private http: HttpClient) {
    this.mockUrl = '../../assets/mocks/'
  }

  getAllUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(`${this.mockUrl}user.json`).pipe(catchError(this.handleError))
  }

  getAllRequests(): Observable<RequestDTO[]> {
    return this.http.get<RequestDTO[]>(`${this.mockUrl}request.json`).pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      errorMessage = `->Client-side error: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = `->Server-side error: ${error.status} ${error.message}`;
    }
    return throwError(errorMessage);
  }

}
