import { Blog } from './blog';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable,of, throwError } from "rxjs";
import { map,catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private productUrl = 'https://troubled-flat-riverbed.glitch.me/blogs';
  constructor(private http: HttpClient) { }

  // Json Server API
  // getBlogs(): Observable<Blog[]> {
  //   return this.http.get<Blog[]>(this.productUrl).pipe(
  //     tap(data => console.log('All: ', JSON.stringify(data))),
  //     catchError(this.handleError)
  //   );
  // }

  // Java Server API to get All Blogs
  getBlogsFromJavaServer():Observable<Blog[]>{
    const getBlogsURL="http://localhost:8080/blogs";
    return this.http.get<Blog[]>(getBlogsURL).pipe(
      tap(data => console.log('All: '/*getBlogByBlogId*/)),
      catchError(this.handleError)
    );
  }

  // Jave API to get Blog by Blog Id
  getBlogByBlogId(autherId:number): Observable<Blog>{
    const getBlogByBlogIdURL="http://localhost:8080/blog/"+autherId;

    return this.http.get<Blog>(getBlogByBlogIdURL).pipe(
      tap(data=>console.log("getBlogByBlogId")),
      catchError(this.handleError)
    );
  }

  // Json Server API
  getBlogsByAuthorId(authorId:number): Observable<Blog[]> {
    //const getBlogsByAuthorIdURL = 'https://troubled-flat-riverbed.glitch.me/blogs?authorId='+String(authorId);
    const getBlogsByAuthorIdURL = "http://localhost:8080/blogs/autherId="+authorId;
    return this.http.get<Blog[]>(getBlogsByAuthorIdURL).pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  // Json Server API
  addBlog(heading:string, content:string, authorName:string, authorId:number, shortIntro:string, timeToRead:number ): Observable<Blog>{

    // const addBlogURL="https://troubled-flat-riverbed.glitch.me/blogs";
    // const requestBody = { heading:heading, content:content, authorName:authorName,authorId:authorId, shortIntro:shortIntro, timeToRead:timeToRead  };

    const addBlogURL="http://localhost:8080/blog";
    const requestBody = { heading:heading, content:content, autherName:authorName,authorId:authorId, shortIntro:shortIntro, timeToRead:timeToRead, isPublic:true };

    return this.http
    .post(addBlogURL, requestBody, { headers: { 'Content-Type': 'application/json' } })
    .pipe(
      map((result:any)=>result),
      catchError(this.handleError)
    );
  }

  // Json Server API
  deleteBlog(id:number){
    // let deleteBlogURL="https://troubled-flat-riverbed.glitch.me/blogs/"+id;
    let deleteBlogURL="http://localhost:8080/blog/"+id;

    return this.http.delete(deleteBlogURL).pipe(
      map((result:any)=>console.log(result) ),
      catchError(error => {
        if (error.status >= 200 && error.status < 300 && error.statusText === 'OK') {
          console.log("success");
          return of("success");
        }
        console.log("failure");
        return this.handleError(error);
      })
      );
  }

  // Json Server API
  editBlog(id:number ,heading:string|undefined, content:string|undefined, authorName:string|undefined,authorId:number|undefined, shortIntro:string|undefined, timeToRead:number|undefined ): Observable<Blog>{
    // let editBlogURL="https://troubled-flat-riverbed.glitch.me/blogs/"+id;
    // const requestBody = { heading:heading, content:content, authorName:authorName,authorId:authorId, shortIntro:shortIntro, timeToRead:timeToRead  };

    const editBlogURL="http://localhost:8080/blog";
    const requestBody = {id:id, heading:heading, content:content, autherName:authorName,authorId:authorId, shortIntro:shortIntro, timeToRead:timeToRead, isPublic:true };

    return this.http.put(editBlogURL, requestBody, { headers: { 'Content-Type': 'application/json' } })
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
