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
   this._userService.getUsers().subscribe(data => {
     this.Users = data;
     this.activeUser = this.Users.find(u => u.status === true);
     if (this.activeUser) {
       this.check = this.activeUser.status;
     }
   });
  }

}
