import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'tb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TechBlog';
  flag=false;

  constructor(
    private router: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    if(this.cookieService.check("emailId") && this.cookieService.check("password")){
      //this.router.navigate(['index']);
      this.flag=true;
    }
    else{
      //this.router.navigate(['authentication']);
      this.flag=false;
    }
  }

}
