import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable,of, throwError } from "rxjs";
import { map,catchError, tap } from 'rxjs/operators';
import { user } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // getUserName: Observable<user[]>(id :number){
  //   const getUserUrlById = 'https://troubled-flat-riverbed.glitch.me/users?id='+id;
  //   console.log(getUserUrlById);
  //   return this.http.get<user[]>(getUserUrlById).pipe(
  //     tap(data => console.log('All: ', JSON.stringify(data))),
  //     catchError(this.handleError)
  //   );
  // }

  // Json Server API
  // getUsers():Observable<user[]>{
  //   const getUserNameByIdUrl='https://troubled-flat-riverbed.glitch.me/users';
  //   return this.http.get<user[]>(getUserNameByIdUrl).pipe(
  //     tap(data => console.log('')),
  //     catchError(this.handleError)
  //   );

  // }

  // Java API
  getUserConfirmation(emailId:string, password:string):Observable<user>{
    const getUserConfirmationByemailIdAndPassword="http://localhost:8080/login/"+emailId+"/"+password;
    return this.http.get<user>(getUserConfirmationByemailIdAndPassword).pipe(
      tap(data => console.log('')),
      catchError(this.handleError)
    );
  }

  // Json Server API
  // addUser(name:string, emailId:string, password:string):Observable<user>{
  //   const addUserURL="https://troubled-flat-riverbed.glitch.me/users";
  //   const requestBody = { name:name, emailId:emailId, password:password };
  //   return this.http
  //   .post(addUserURL, requestBody, { headers: { 'Content-Type': 'application/json' } })
  //   .pipe(
  //     map((result:any)=>result),
  //     catchError(this.handleError)
  //   );
  // }

  // Java API
  addUserInJavaServer(name:string, emailId:string, password:string):Observable<boolean>{
    const addUserURL="http://localhost:8080/register";
    const requestBody = { name:name, emailid:emailId, password:password };
    return this.http
    .post(addUserURL, requestBody, { headers: { 'Content-Type': 'application/json' } })
    .pipe(
      map((result:any)=>result),
      catchError(this.handleError)
    );
  }

  // Json Server API
  // updateUser(id:number,name:string, emailId:string, password:string):Observable<user>{
  //   const updateUserURL="https://troubled-flat-riverbed.glitch.me/users/"+String(id);
  //   const requestBody = { name:name, emailId:emailId, password:password};

  //   return this.http.put(updateUserURL, requestBody, { headers: { 'Content-Type': 'application/json' } })
  //   .pipe(
  //     map((result:any)=>result),
  //     catchError(this.handleError)
  //   );
  // }

  // Java API
  updateUserInJavaServer(id:number,name:string, emailId:string, password:string):Observable<boolean>{
    const updateUserURL="http://localhost:8080/user";
    const requestBody = { id:id, name:name, emailId:emailId, password:password};

    return this.http.put(updateUserURL, requestBody, { headers: { 'Content-Type': 'application/json' } })
    .pipe(
      map((result:any)=>result),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
