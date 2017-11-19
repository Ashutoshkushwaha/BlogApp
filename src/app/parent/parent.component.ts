import { Component } from '@angular/core';
import {Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css'],
})

export class ParentComponent  {

  constructor(private _router: Router) {
  }
  userLogin(): void {
    this._router.navigate(['login']);
  }
}
