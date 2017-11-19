import { Component, OnInit} from '@angular/core';
import {IBlog} from './blogs';
import {BlogsService} from './blogs.service';
import {IUser} from '../Admin/users';
import {UsersService} from '../Admin/users.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent  implements OnInit {

  check = false;
  user: IUser[];
  activeUser: IUser;
  blog: IBlog[] = [];
  filteredBlogs: IBlog[];
  _listFilter: string ;
  get listFilter(): string{
    return this._listFilter;
  }
  set listFilter(value: string){
    this._listFilter = value;
    this.filteredBlogs = this.listFilter ? this.performFilter(this.listFilter) : this.blog;
  }
  constructor(private _blogsService: BlogsService, private _userService: UsersService) {}
  ngOnInit(): void {
    this._blogsService.getBlogs()
          .subscribe(blogs => {
            this.blog = blogs;
            this.filteredBlogs = blogs;
            this._userService.getUsers()
              .subscribe(user => {
                this.user = user;
                this.activeUser = this.user.find(u => u.status === true);
                if (this.activeUser) {
                  this.check = true;
                }
              });
          });
  }
  markFavorite(id: number) {
    if (!this.activeUser.favorite.includes(id)) {
      this.activeUser.favorite.push((this.blog.find( b => b.id === id)).id);
      console.log(this.activeUser.favorite);
      this._userService.changeActive(this.activeUser).subscribe();
    }else {
      delete this.activeUser.favorite[this.activeUser.favorite.findIndex(item => item === id)];
      this._userService.changeActive(this.activeUser).subscribe();
    }
  }
  performFilter(filterBy: string): IBlog[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.blog.filter( item =>
      item.blogTitle.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
}
