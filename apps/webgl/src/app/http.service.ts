/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  loadFile(route: any): Observable<any> {
    const headers = new HttpHeaders();
    return this.http.get(route, { headers, responseType: 'text' }).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
