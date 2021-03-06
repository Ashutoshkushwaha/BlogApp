import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {IBlog} from './blogs';
import 'rxjs/add/operator/do';

@Injectable()
export class BlogsService {

  private _blogUrl = 'https://blogapp-ashutosh.herokuapp.com/blogs';

  constructor(private _http: HttpClient) {
  }
  getBlogs(): Observable<IBlog[]> {
    return this._http.get<IBlog[]>(this._blogUrl);

  }

  postBlogs(newBlog: IBlog): Observable<IBlog> {
    return this._http.post<IBlog>(this._blogUrl, newBlog);

  }

  updateBlogs(newBlog: IBlog): Observable<IBlog> {
    return this._http.patch<IBlog>(this._blogUrl + '/' + newBlog.id, newBlog );

  }

  deleteBlogs(id: number): Observable<IBlog> {
    return this._http.delete<IBlog>(this._blogUrl  +  '/' + id);
  }
}
