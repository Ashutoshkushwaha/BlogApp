import { Component, OnInit} from '@angular/core';
import {UsersService} from '../Admin/users.service';
import {IUser} from '../Admin/users';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.css']
})
export class StarterComponent implements OnInit {

  Users: IUser[];
  activeUser: IUser;
  check = false;
  constructor(private _userService: UsersService ) { }
  ngOnInit(): void {
    this.activeUser = JSON.parse(sessionStorage.getItem('activeUser'));
    if (this.activeUser) {
      this.check = this.activeUser.status;
    }

  }

}
