import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {IUser} from './users';
import 'rxjs/add/operator/do';
import {IBlog} from "../blogs/blogs";


@Injectable()
export class UsersService {

  private _userUrl = 'https://blogapp-ashutosh.herokuapp.com/users';

  constructor(private _http: HttpClient) {
  }
  getUsers(): Observable<IUser[]> {
    return this._http.get<IUser[]>(this._userUrl);
  }

  changeActive(item) {
      return this._http.patch(this._userUrl + '/' + item.id, item);
  }

  postUser(item) {
    return this._http.post(this._userUrl, item);
  }
}
