import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';

@Injectable()
export class MainService {

  loggedUser;

  constructor(private _http: Http) { }

  addUser(user) {
    this.loggedUser = user;
    return this._http.post('/register', user).map(data => data.json()).toPromise();
  }

  login(user){
    this.loggedUser = user;
    return this._http.post('/login', user).map(data => data.json()).toPromise();
  }

  GrabCurrentUser(){
    return this._http.get('/grabuser').map(data => data.json()).toPromise();
  }

  LogoutUser(){
    return this._http.get('/logout').toPromise();
  }

}
