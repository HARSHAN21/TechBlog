import { BlogService } from './../blog.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Blog } from '../blog';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'tb-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit,OnDestroy {

  pageTitle: string = "Blog List" ;
  sub!:Subscription;
  errorMessage: string = '';
  isLoading:boolean=true;
  isDeleting:boolean=false;

  openSnackBar(){
    this.snackBar.open("Blog deleted successfully!",'dismiss',{
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

  blogs: Blog[]=[];
  filteredBlog: Blog[]=[];

  constructor(private blogService: BlogService,
    private router:Router,
    private snackBar:MatSnackBar,
    ) { }

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

  ngOnInit(): void {
    this.isDeleting=false;
    this.sub=this.blogService.getBlogsFromJavaServer().subscribe({
      next : val => {
        this.isLoading=false;
        this.blogs=val;
        this.filteredBlog=val;
      },
      error: err => {
        this.errorMessage = err;
        this.isLoading=false;
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
