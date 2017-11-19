import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from '../Admin/users.service';
import {IUser} from '../Admin/users';

@Component({
  selector: 'app-new-user-register',
  templateUrl: './new-user-register.component.html',
  styleUrls: ['./new-user-register.component.css']
})
export class NewUserRegisterComponent {
  newUser: IUser = {
    id: null,
    name: '',
    username: '',
    password: '',
    favorite: [],
    status: false
  };
  constructor(private _router: Router, private _userService: UsersService) { }
  RegisterUser(name, username, pass) {
    this.newUser.favorite = [];
    this.newUser.name = name;
    this.newUser.username = username;
    this.newUser.password = pass;
    this._userService.postUser(this.newUser).subscribe();
    this._router.navigate(['login']);
    location.reload();
  }
}
