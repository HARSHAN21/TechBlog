import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/user/user.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'tb-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  hide = true;
  emailId : string ="";
  password : string ="";
  name : string ="";
  isLoading:boolean=false;

  registrationForm!:FormGroup ;

  constructor(
    private snackBar:MatSnackBar,
    private userService:UserService,
    private fb: FormBuilder
  ) {}

  openSnackBar(){
    this.snackBar.open("Registration successfull!",'dismiss',{
      duration : 3000,
    });
  }

  openErrorSnackBar(){
    this.snackBar.open("Some errors occured, Please try again after sometime!",'dismiss',{
      duration : 3000,
    });
  }

  registration(){
    this.isLoading=true;
    console.log("In registration emailid : "+this.emailId);
    console.log("In registration password : "+this.password);
    // if(this.emailId!="" && this.password!=""){
    //   this.userService.addUser(this.name, this.emailId, this.password).subscribe({
    //     next : val => {
    //       console.log("in add method ",val);
    //       this.isLoading=false;
    //       this.openSnackBar();
    //     },
    //     error: err => {
    //       this.isLoading=false;
    //       console.log("error in add : ",err);
    //     }
    //   });
    // }
    // else{
    //   this.isLoading=false;
    // }

    if(this.registrationForm.valid){
      this.name=this.registrationForm.controls["name"].value;
      this.emailId=this.registrationForm.controls["emailId"].value;
      this.password=this.registrationForm.controls["password"].value;

      // calling Json Server API

      // this.userService.addUser(this.name, this.emailId, this.password).subscribe({
      //   next : val => {
      //     console.log("in add method ",val);
      //     this.isLoading=false;
      //     this.openSnackBar();
      //   },
      //   error: err => {
      //     this.isLoading=false;
      //     this.openErrorSnackBar();
      //     console.log("error in add : ",err);
      //   }
      // });

      // calling Java Server API
      this.userService.addUserInJavaServer(this.name, this.emailId, this.password).subscribe({
        next : val => {
          if(val){
            console.log("in add method ",val);
            this.isLoading=false;
            this.openSnackBar();
          }
          else{
            this.isLoading=false;
            this.openErrorSnackBar();
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
      this.registrationForm.markAllAsTouched();
    }

  }

  public myError = (controlName: string, errorName: string) =>{
    return this.registrationForm.controls[controlName].hasError(errorName);
  }

  ngOnInit(): void {
    this.hide = true;
    this.isLoading=false;
    // this.myForm =this.initFormGroup();
    this.registrationForm = this.fb.group({
      name:['',([Validators.maxLength(20)])],
      emailId:['',([Validators.maxLength(20),Validators.email])],
      password:['',([Validators.maxLength(15)])]
    });

  }

}
