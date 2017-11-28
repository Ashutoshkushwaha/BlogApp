import { Component, OnInit } from '@angular/core';
import {UsersService} from '../Admin/users.service';
import {BlogsService} from '../blogs/blogs.service';
import {IUser} from '../Admin/users';
import {IBlog} from '../blogs/blogs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  blogs: IBlog[];
  user: IUser[];
  activeUser: IUser = {
    id: null,
    name: '',
    username: '',
    password: '',
    favorite: [],
    status: null
  };
  constructor( private _userService: UsersService, private _blogService: BlogsService) { }

  ngOnInit() {
    this._blogService.getBlogs()
      .subscribe(data => {
        this.blogs = data;
        this.activeUser = JSON.parse(sessionStorage.getItem('activeUser'));

      });
  }
  markFavorite(id: number) {
      delete this.activeUser.favorite[this.activeUser.favorite.findIndex(item => item === id)];
      this._userService.changeActive(this.activeUser).subscribe();
      sessionStorage.setItem('activeUser', JSON.stringify(this.activeUser));

  }

}
