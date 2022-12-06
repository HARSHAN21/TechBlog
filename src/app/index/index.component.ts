import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'tb-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private router: Router,
    private cookieService: CookieService
    ) { }

  ngOnInit(): void {
    this.router.navigate(["home"]);
  }

  logOut():void{
    this.cookieService.deleteAll();
    this.router.navigate(["app"]);
    location.reload();
  }

}
