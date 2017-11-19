import {Component, OnInit} from '@angular/core';
import {BlogsService} from '../blogs/blogs.service';
import {IBlog} from '../blogs/blogs';
import {ActivatedRoute} from '@angular/router';
import {IUser} from '../Admin/users';
import {UsersService} from "../Admin/users.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  blogs: IBlog[];
  Users: IUser[];
  activeUser: IUser = {
    id: null,
    name: '',
    username: '',
    password: '',
    favorite: [],
    status: null
  };
  category: string = null;
  categories: String[] = [];
  filterCategories: IBlog[] = [];
  constructor(private _blogservice: BlogsService, private _route: ActivatedRoute, private _userService: UsersService) { }
  ngOnInit(): void {
    this.category = this._route.snapshot.paramMap.get('id');

    this._blogservice.getBlogs()
      .subscribe(data => {
        this._userService.getUsers()
          .subscribe( user => {
            this.Users = user;
            this.activeUser = this.Users.find(item => item.status === true);
          });
        this.blogs = data;
        data.forEach(item => {
          if (!this.categories.includes(item.category)) {
            this.categories.push(item.category);
          }
          if (this.category !== null && item.category === this.category) {
            this.filterCategories.push(item);
          }
        });
      });
  }

  markFavorite(id: number) {
    if (!this.activeUser.favorite.includes(id)) {
      this.activeUser.favorite.push((this.blogs.find( b => b.id === id)).id);
      console.log(this.activeUser.favorite);
      this._userService.changeActive(this.activeUser).subscribe();
    }else {
      delete this.activeUser.favorite[this.activeUser.favorite.findIndex(item => item === id)];
      this._userService.changeActive(this.activeUser).subscribe();
    }
  }
}
