
import { CookieService } from 'ngx-cookie-service';
import { BlogService } from '../blog/blog.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Blog } from '../blog/blog';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './user.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'tb-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit,OnDestroy {

  hide = true;
  emailId: string = "";
  password: string = "";
  name:string="";
  id:number=0;

  sub!:Subscription;
  errorMessage: string = '';
  isLoading:boolean=true;
  isDeleting:boolean=false;
  isPasswordUpdating:boolean=false;

  userInfoForm!:FormGroup ;

  openSnackBar(){
    this.snackBar.open("Blog deleted successfully!",'dismiss',{
      duration : 3000,
    });
  }

  openSnackBarUpdatePassword(){
    this.snackBar.open("Password Updated successfully!",'dismiss',{
      duration : 3000,
    });
  }

  openErrorSnackBar(){
    this.snackBar.open("Some errors occured, Please try again after sometime!",'dismiss',{
      duration : 3000,
    });
  }

  private _listFilter: string = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    console.log('In setter:', value);
    this.filteredBlog = this.performFilter(value);
  }

  performFilter(filterBy: string): Blog[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.blogs.filter((blog: Blog) =>
      blog.heading.toLocaleLowerCase().includes(filterBy));
  }

  deleteBlog(id:number){
    this.isDeleting=true;
    console.log("delete Id : ",id);
    this.blogService.deleteBlog(id).subscribe({
      next : val =>{
        // if(val === "success"){
        //   console.log("delete successfully");
        //   this.router.navigate(['blogs']);
        // }
        this.isDeleting=false;
        this.openSnackBar();
        console.log("outside delete successfully");
        //this.router.navigate(['home']);
        this.ngOnInit();
      },
      error: err => this.errorMessage = err
    });
  }

  blogs: Blog[]=[];
  filteredBlog: Blog[]=[];

  updatePassword(){
    this.isPasswordUpdating=true;
    if(this.userInfoForm.valid){
      this.password=this.userInfoForm.controls["password"].value;

      // calling Json Server API

      // this.userService.updateUser(this.id,this.name,this.emailId,this.password).subscribe({
      //   next : val => {
      //     console.log("in update method ",val);
      //     this.isPasswordUpdating=false;
      //     this.openSnackBarUpdatePassword();
      //     this.cookieService.set("password",val.password);
      //     this.password=val.password;
      //   },
      //   error: err => {
      //     this.isPasswordUpdating=false;
      //     this.openErrorSnackBar();
      //     console.log("error in add : ",err)
      //   }
      // });

      // calling Java Server API
      this.userService.updateUserInJavaServer(this.id,this.name,this.emailId,this.password).subscribe({
        next : val => {
          if(val){
            console.log("in update method ",val);
            this.isPasswordUpdating=false;
            this.openSnackBarUpdatePassword();
            this.cookieService.set("password",this.password);
          }
          else{
            this.isPasswordUpdating=false;
            this.openErrorSnackBar();
          }
        },
        error: err => {
          this.isPasswordUpdating=false;
          this.openErrorSnackBar();
          console.log("error in add : ",err)
        }
      });

    }
    else{
      this.isPasswordUpdating=false;
      this.userInfoForm.markAllAsTouched();
    }
  }

  constructor(private cookieService: CookieService,
    private blogService: BlogService,
    private router:Router,
    private snackBar:MatSnackBar,
    private userService:UserService,
    private fb: FormBuilder
    ) { }


  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.hide = true;
    this.isLoading=true;
    this.emailId=this.cookieService.get("emailId");
    this.password=this.cookieService.get("password");
    this.name=this.cookieService.get("name");
    this.id=Number(this.cookieService.get("id"));
    this.isDeleting=false;
    this.isPasswordUpdating=false;
    this.sub=this.blogService.getBlogsByAuthorId(this.id).subscribe({
      next : val => {
        this.isLoading=false;
        this.blogs=val;
        this.filteredBlog=val;
      },
      error: err => {
        this.errorMessage = err;
        console.log("error are : ",this.errorMessage);
        this.blogs=[];
        this.isLoading=false;
      }
    });

    this.userInfoForm = this.fb.group({
      name:[this.name,([Validators.maxLength(20)])],
      emailId:[this.emailId,([Validators.maxLength(20),Validators.email])],
      password:[this.password,([Validators.maxLength(15)])]
    });

  }

  public myError = (controlName: string, errorName: string) =>{
    return this.userInfoForm.controls[controlName].hasError(errorName);
  }

}
