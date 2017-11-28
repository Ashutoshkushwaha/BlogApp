import {Component, OnInit} from '@angular/core';
import {BlogsService} from '../blogs/blogs.service';
import {IBlog} from '../blogs/blogs';
import {UsersService} from '../Admin/users.service';
import {IUser} from '../Admin/users';
import index from "@angular/cli/lib/cli";

@Component({
  selector: 'app-new-blog',
  templateUrl: './new-blog.component.html',
  styleUrls: ['./new-blog.component.css']
})
export class NewBlogComponent  implements OnInit {

  buttonText = 'Post Blog';
  blogs: IBlog[];
  activeUser: IUser = {
    id: null,
    'name': '',
    'username': '',
    'password': '',
    'favorite': [],
    'status': false
  };
  filteredblog: IBlog[] = [];
  newBlog: IBlog = {
    'id': null,
    'blogTitle': '',
    'blogDescription': '',
    'author': '',
    'category': ''
  };
  constructor(private _blogService: BlogsService, private _userService: UsersService) {
  }
  ngOnInit(): void {
    this._blogService.getBlogs()
      .subscribe(data => {
        this.blogs = data;
        this.activeUser = JSON.parse(sessionStorage.getItem('activeUser'));
        console.log(this.activeUser);
        this.newBlog.author = this.activeUser.name;
            this.blogs.forEach( item => {
              if (item.author === this.activeUser.name) {
                this.filteredblog.push(item);
              }
            });
      });
  }
  checkBlog() {
    if (this.newBlog.id === null && this.newBlog.blogTitle !== '') {
      this.BlogPost(this.newBlog);
    } else {
      this.updateBlog(this.newBlog);
    }
  }
  BlogPost(blog: IBlog) {
    this._blogService.postBlogs(blog)
      .subscribe(data => {
        this.filteredblog.push(blog);
        location.reload();
      });
  }
  update(title: string) {
    this.buttonText = 'Update post';
    this.newBlog = this.blogs.find( b => b.blogTitle === title );
  }
  updateBlog(blog: IBlog) {
    this._blogService.updateBlogs(blog)
      .subscribe(data => {
        location.reload();
      });
  }

  deletePost(title: string) {
    this.newBlog = this.blogs.find( b => b.blogTitle === title );
    this._blogService.deleteBlogs(this.newBlog.id).subscribe(data => {
      location.reload();
    });
  }
  markFavorite(id: number) {
    if (!this.activeUser.favorite.includes(id)) {
      this.activeUser.favorite.push((this.blogs.find( b => b.id === id)).id);
      this._userService.changeActive(this.activeUser).subscribe();
    }else {
      delete this.activeUser.favorite[this.activeUser.favorite.findIndex(item => item === id)];
      this._userService.changeActive(this.activeUser).subscribe();
    }
    sessionStorage.setItem('activeUser', JSON.stringify(this.activeUser));
  }

}
