import { Component, OnInit, OnDestroy, HostListener, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'tb-user-authentication',
  templateUrl: './user-authentication.component.html',
  styleUrls: ['./user-authentication.component.css']
})
export class UserAuthenticationComponent implements OnInit,OnDestroy {

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private elementRef: ElementRef,
  ) { }

  ngOnInit(): void {
    // if(this.cookieService.check("emailId") && this.cookieService.check("password")){
    //   this.ngOnDestroy();
    //   this.router.navigate(['index']);
    // }
    // else{
    //   this.router.navigate(['registration']);
    // }
    this.router.navigate(['registration']);
  }

  //@HostListener('unloaded')
  ngOnDestroy() {
    //this.elementRef.nativeElement.remove();
    console.log('user auth Items destroyed');
  }

}
