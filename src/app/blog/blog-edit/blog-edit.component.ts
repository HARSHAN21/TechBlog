import { Component, OnInit } from '@angular/core';
import { BlogService } from './../blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../blog';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'tb-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css']
})
export class BlogEditComponent implements OnInit {

  blog: Blog | undefined;
  blogs: Blog[]=[];
  errorMessage: string = '';
  sub!: Subscription;

  heading: string | undefined;
  content: string | undefined;
  autherName: string | undefined;
  autherId: number | undefined;
  shortIntro: string | undefined;
  timeToRead: number | undefined;
  addMsgFlag: boolean = false;
  isLoading: boolean=false;

  blogEditForm!:FormGroup ;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private blogSerice:BlogService,
              private cookieService:CookieService,
              private snackBar:MatSnackBar,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.isLoading=true;
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.blogSerice.getBlogByBlogId(id).subscribe({
      next : newBlog =>{
        this.blog=newBlog;
        this.isLoading=false;
        this.heading=this.blog?.heading;
        this.content=this.blog?.content;
        this.autherName=this.blog?.autherName;
        this.autherId=this.blog?.autherId;
        this.shortIntro=this.blog?.shortIntro;
        this.timeToRead=this.blog?.timeToRead;
        this.blogEditForm = this.fb.group({
          heading:[this.heading,([Validators.maxLength(50)])],
          content:[this.content,([Validators.maxLength(500)])],
          shortIntro:[this.shortIntro,([Validators.maxLength(100)])],
          timeToRead:[this.timeToRead,([Validators.min(1),Validators.max((15))])]
        });
      },
      error: err =>{
        this.errorMessage = err;
        this.isLoading=false;
        this.openErrorSnackBar();
      }
    });

  }

  onBack(): void {
    this.router.navigate(['/blogs']);
  }

  openSnackBar(){
    this.snackBar.open("Blog edited successfully!",'dismiss',{
      duration : 3000,
    });
  }

  openErrorSnackBar(){
    this.snackBar.open("Some errors occured, Please try again after sometime!",'dismiss',{
      duration : 3000,
    });
  }

  editBlog(){
    this.isLoading=true;

    if(this.blogEditForm.valid){
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.heading=this.blogEditForm.controls["heading"].value;
      this.content=this.blogEditForm.controls["content"].value;
      this.shortIntro=this.blogEditForm.controls["shortIntro"].value;
      this.timeToRead=this.blogEditForm.controls["timeToRead"].value;
      this.blogSerice.editBlog(id, this.heading, this.content, this.autherName,this.autherId, this.shortIntro, this.timeToRead).subscribe({
        next : val => {
          console.log("in add method ",val);
          this.isLoading=false;
          this.openSnackBar();
        },
        error: err =>{
          console.log("error in add : ",err);
          this.isLoading=false;
          this.openErrorSnackBar();
        }
      });
    }
    else{
      this.isLoading=false;
      this.blogEditForm.markAllAsTouched();
    }

  }

  public myError = (controlName: string, errorName: string) =>{
    return this.blogEditForm.controls[controlName].hasError(errorName);
  }

}
