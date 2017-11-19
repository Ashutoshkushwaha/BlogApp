import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from '../users.service';
import {IUser} from '../users';

@Component({
  selector: 'app-parent-admin',
  templateUrl: './parent-admin.component.html',
  styleUrls: ['./parent-admin.component.css']
})
export class ParentAdminComponent implements OnInit {

  Users: IUser[];
  activeUser: IUser = {
    id: null,
    name: '',
    username: '',
    password: '',
    favorite: [],
    status: null
  };
  ngOnInit(): void {
    this._userService.getUsers()
      .subscribe( data => {
        this.Users = data;
        this.activeUser = this.Users.find(item => item.status === true);


      });

  }
  constructor(private _router: Router, private _userService: UsersService) { }
  onLogOut() {
    if (this.activeUser) {
      this.activeUser.status = false;
    }
    this._userService.changeActive(this.activeUser).subscribe();
    location.reload();
    this._router.navigate(['login']);
  }

}
