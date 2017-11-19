import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from '../Admin/users.service';
import {IUser} from '../Admin/users';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css'],
})
export class LoginpageComponent  implements OnInit{

  Users: IUser[];
  activeUser: IUser;
  check = false;
  constructor(private _router: Router, private _userService: UsersService) { }

  ngOnInit(): void {
      this._userService.getUsers().subscribe(data => {
      this.Users = data;
    });
  }
  CreateAccount() {
    console.log('new');
     this._router.navigate(['newuser']);
  }
  SuccessFulLogin(username, password) {
    this.activeUser = this.Users.find(u => u.username === username && u.password === password);
    if (this.activeUser) {
      this.activeUser.status = true;
      this._userService.changeActive(this.activeUser).subscribe();
      location.reload();
      this._router.navigate(['dashboard']);
    } else {
      this.check = true;
    }

  }

}
