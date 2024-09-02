import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { JwtService } from './jwt.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient, private jwtService: JwtService) { }

  private formatErrors(error: any) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(error.error);
  }
  // search(term: string) {
  //   if (term === "") {
  //     return of([]);
  //   }
  //   return this.http
  //     .get<[any, any[]]>(
  //       `${environment.api_url}routes?odata?$filter=contains(routeSourceName,` +
  //       `${term}` +
  //       `)`
  //     )
  //     .pipe(map((response: any) => response["routesModel"]));

  // }
  get(path: string, header: any): Observable<any> {
    return this.http
      .get(`${environment.api_url}${path}`,  { headers: header })
      .pipe(catchError(this.formatErrors));
    // }else{
    //   return window.alert("Connection Offline");
    // }
  }

  put(path: string, body: any, header: any): Observable<any> {
    return this.http
      .put(`${environment.api_url}${path}`, body, { headers: header })
      .pipe(
        catchError(this.formatErrors),
        retry(1),
        catchError(this.handleError)
      );
  }
  putWithoutHeader(path: string, body: any): Observable<any> {
    return this.http
      .put(`${environment.api_url}${path}`, body)
      .pipe(
        catchError(this.formatErrors),
        retry(1),
        catchError(this.handleError)
      );
  }
  post(path: string, body: any, header: any): Observable<any> {
    return this.http
      .post(`${environment.api_url}${path}`, body, { headers: header })
      .pipe(
        catchError(this.formatErrors),
        retry(1),
        catchError(this.handleError)
      );

  }

  
  postWithoutHeader(path: string, body: any): Observable<any> {
    return this.http
      .post(`${environment.api_url}${path}`, body)
      .pipe(
        catchError(this.formatErrors),
        retry(1),
        catchError(this.handleError)
      );
  }
  delete(path: string, body: Object = {}): Observable<any> {
    return this.http
      .delete(`${environment.api_url}${path}`)
      .pipe(
        catchError(this.formatErrors),
        retry(1),
        catchError(this.handleError)
      );
  }
  patch(path: string, body: any): Observable<any> {
    return this.http
      .patch(`${environment.api_url}${path}`, body)
      .pipe(
        catchError(this.formatErrors),
        retry(1),
        catchError(this.handleError)
      );
  }
  handleError(error:any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    //console.log(errorMessage+"er");
    window.alert(errorMessage);
    return throwError(() => {
        return errorMessage;
    });
  }
}
