import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BlogsService} from './blogs/blogs.service';

import { AppComponent } from './app.component';
import { BlogsComponent } from './blogs/blogs.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { ParentComponent } from './parent/parent.component';
import {RouterModule} from '@angular/router';
import { NewBlogComponent } from './new-blog/new-blog.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { CategoryComponent } from './category/category.component';
import { NewUserRegisterComponent } from './new-user-register/new-user-register.component';
import { ParentAdminComponent } from './Admin/parent-admin/parent-admin.component';
import { StarterComponent } from './starter/starter.component';
import {UsersService} from './Admin/users.service';
import { FavoritesComponent } from './favorites/favorites.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    BlogsComponent,
    ParentComponent,
    NewBlogComponent,
    LoginpageComponent,
    CategoryComponent,
    NewUserRegisterComponent,
    ParentAdminComponent,
    StarterComponent,
    FavoritesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'home', component: BlogsComponent},
      {path: 'allBlog', component: BlogsComponent},
      {path: 'dashboard', component: NewBlogComponent},
      {path: 'categories/:id', component: CategoryComponent},
      {path: 'categories', component: CategoryComponent},
      {path: 'login', component: LoginpageComponent},
      {path: 'newuser', component: NewUserRegisterComponent},
      {path: 'favorite', component: FavoritesComponent},
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: '**', component: NewUserRegisterComponent},
    ])

  ],
  providers: [BlogsService, UsersService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
