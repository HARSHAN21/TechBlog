import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/user/user.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'tb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {

  hide = true;
  emailId : string ="";
  password : string ="";
  isLoading=false;
  loginForm!:FormGroup ;

  openWrongCredentialSnackBar(){
    this.snackBar.open("Wrong Email Id or Password!",'dismiss',{
      duration : 3000,
    });
  }

  openErrorSnackBar(){
    this.snackBar.open("Some errors occured, Please try again after sometime!",'dismiss',{
      duration : 3000,
    });
  }

  login(){
    this.isLoading=true;
    if(this.loginForm.valid){
      this.emailId=this.loginForm.controls["emailId"].value;
      this.password=this.loginForm.controls["password"].value;

      // calling Json server API

      // this.userService.getUsers().subscribe({
      //   next : val => {
      //     val.forEach(usr => {
      //       if(usr.emailId === this.emailId && usr.password === this.password){
      //         this.isLoading=false;
      //         this.cookieService.set("emailId",usr.emailId);
      //         this.cookieService.set("password",usr.password);
      //         this.cookieService.set("name",usr.name);
      //         this.cookieService.set("id",String(usr.id));
      //         this.ngOnDestroy();
      //         this.router.navigate(['app']);
      //         location.reload();
      //       }
      //     });
      //     if(this.isLoading){
      //       this.isLoading=false;
      //       this.openWrongCredentialSnackBar();
      //     }
      //   },
      //   error: err => {
      //       this.isLoading=false;
      //       this.openErrorSnackBar();
      //       console.log("error in add : ",err);
      //   }
      // });

      // calling Java server API
      this.userService.getUserConfirmation(this.emailId, this.password).subscribe({
        next : usr => {
          // console.log("usr : ",usr);
          // console.log("cond 1 : ",usr.emailid === this.emailId);
          // console.log("usr.emailId : ",usr.emailid);
          // console.log("this.emailId : ",this.emailId);
          // console.log("cond 2 : ",usr.password === this.password);
          if(usr.emailid === this.emailId && usr.password === this.password ){
            this.isLoading=false;
            this.cookieService.set("emailId",usr.emailid);
            this.cookieService.set("password",usr.password);
            this.cookieService.set("name",usr.name);
            this.cookieService.set("id",String(usr.id));
            this.ngOnDestroy();
            this.router.navigate(['app']);
            location.reload();
          }
          else{
            this.isLoading=false;
            this.openWrongCredentialSnackBar();
          }
        },
        error: err => {
            this.isLoading=false;
            this.openErrorSnackBar();
            console.log("error in add : ",err);
        }
      });

    }
    else{
      this.isLoading=false;
      this.loginForm.markAllAsTouched();
    }
  }

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private userService:UserService,
    private fb: FormBuilder,
    private snackBar:MatSnackBar,
  ) { }

  public myError = (controlName: string, errorName: string) =>{
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      emailId:['',([Validators.maxLength(20),Validators.email])],
      password:['',([Validators.maxLength(15)])]
    });
    this.hide = true;
    this.isLoading=false;
    if(this.emailId!="" && this.password!="")
      this.login();
  }

  //@HostListener('unloaded')
  ngOnDestroy() {
    console.log('Items destroyed');
  }

}
