import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { BlogDetailComponent } from './blog/blog-detail/blog-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UserAuthenticationComponent } from './user-authentication/user-authentication.component';
import { MyMaterialModule } from  './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { BlogAddComponent } from './blog/blog-add/blog-add.component';
import { BlogEditComponent } from './blog/blog-edit/blog-edit.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user-authentication/login/login.component';
import { RegistrationComponent } from './user-authentication/registration/registration.component';
import { IndexComponent } from './index/index.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BlogListComponent,
    BlogDetailComponent,
    UserAuthenticationComponent,
    BlogAddComponent,
    BlogEditComponent,
    UserComponent,
    LoginComponent,
    RegistrationComponent,
    IndexComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'blogs', component: BlogListComponent },
      { path: 'blogs/:id',component: BlogDetailComponent},
      { path: 'blog/:id',component: BlogEditComponent},
      {path:'authentication', component:UserAuthenticationComponent},
      {path:'addblog', component:BlogAddComponent},
      {path:'login', component:LoginComponent},
      {path:'registration', component:RegistrationComponent},
      {path:'user', component:UserComponent},
      {path:'index', component:IndexComponent},
      {path:'app', component:AppComponent},
      { path: '', redirectTo: 'app', pathMatch: 'full' },
      { path: '**', redirectTo: 'app', pathMatch: 'full' }
    ]),
    MyMaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
