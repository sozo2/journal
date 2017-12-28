import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../main.service';

@Component({
  selector: 'app-logreg',
  templateUrl: './logreg.component.html',
  styleUrls: ['./logreg.component.css']
})
export class LogregComponent implements OnInit {

  // registration validations
  matching_pw = true;
  emailexists = false;
  registereduser = true;
  correctpw = true;
  showlog;
  showsignup;
  imgsrc;
  images = [
    "http://78.media.tumblr.com/257ff498835cb54c0372a3cffd733f8a/tumblr_mr82juZGkz1rot5fpo1_1280.jpg",
    "http://78.media.tumblr.com/ed12ef00704cd0e2ed2e1ce29dabe172/tumblr_ndyz3zz4nI1tu9tubo1_1280.jpg",
    "https://previews.123rf.com/images/smit/smit1202/smit120200042/12472860-snowy-pine-in-winter-forest-Stock-Photo.jpg",
    "https://78.media.tumblr.com/12777fe8003165284d5cfab24ee84086/tumblr_neuqsjyBcy1tsn08go1_1280.jpg",
    "http://78.media.tumblr.com/7eb1c621158f5974c39f07f57013d0c8/tumblr_of4d0viXkX1v46987o1_1280.jpg"
  ]

  register = {
    email: '',
    first: '',
    last: '',
    password: '',
    confirmpw: ''
  }

  login = {
    email: '',
    password: ''
  }

  constructor(private _mainService: MainService, private _router: Router) { }

  grabUser(){
    this._mainService.GrabCurrentUser().then(data => {
      if(data.email != 'none') {
        this._router.navigateByUrl('dashboard');        
      }
    }).catch(err => console.log(err));
  }

  ngOnInit() {
    this.matching_pw = true;
    this.grabUser();
    this.showsignup = true;
    this.showlog = false;
    var imgIndex = this.randomNum(this.images.length);
    this.imgsrc = this.images[imgIndex];
  }

  randomNum(x){
    var result = Math.random();
    result *= x;
    return Math.floor(result);
  }

  registerUser() {

    if (this.register.password != this.register.confirmpw){
      this.matching_pw = false;
    } else {
      this._mainService.addUser(this.register).then(data => {
        this.register = {
        email: '',
        first: '',
        last: '',
        password: '',
        confirmpw: ''
      }
      if (data.errmsg) {
        this.emailexists = data.errmsg.includes("duplicate key error");
      } else {
        this._mainService.loggedUser = data;
        this._router.navigateByUrl('dashboard');
        console.log(data);
      }
      }).catch(err => console.log(err));
      // if (!this.emailexists){
      //   this._router.navigateByUrl('dashboard');
      // }
    }
  }

  loginUser(){
    this._mainService.login(this.login).then(data => {
      if (data.length >= 1) {
        if (data[0].password == this.login.password) {
          this._mainService.loggedUser = data[0];
          this._router.navigateByUrl('dashboard');
        } else {
          this.correctpw = false;
        }
      } else {
        this.registereduser = false;
      }
      this.login = {
        email: '',
        password: '',
      }
    if (data.errmsg) {
      console.log(data.errmsg);
    }
    }).catch(err => console.log(err));
  }

  showlogin(){
    this.showsignup = false;
    this.showlog = true;
  }

  showreg(){
    this.showlog = false;
    this.showsignup = true;
  }

}
