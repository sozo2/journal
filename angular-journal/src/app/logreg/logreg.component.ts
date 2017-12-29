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
    "http://78.media.tumblr.com/7eb1c621158f5974c39f07f57013d0c8/tumblr_of4d0viXkX1v46987o1_1280.jpg",
    "http://78.media.tumblr.com/2498d600ad4da3a758370d6e50d030d3/tumblr_o0s2cnmwLT1roalj6o1_1280.jpg",
    "https://images.unsplash.com/photo-1486496146582-9ffcd0b2b2b7?auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1503401639559-b16332601594?auto=format&fit=crop&w=1268&q=80",
    "https://images.unsplash.com/photo-1503049555010-f8616ee8f0f3?auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1507548216198-ce23dface74c?auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1442850473887-0fb77cd0b337?auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1431794062232-2a99a5431c6c?auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1446292532430-3e76f6ab6444?auto=format&fit=crop&w=1404&q=80",
    "https://images.unsplash.com/photo-1415639636295-61ae91a98b39?auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1414510451013-d0a41fea512e?auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1513343046852-84ea43694080?auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1448713551278-27e64beaa3fd?auto=format&fit=crop&w=1267&q=80",
    "https://images.unsplash.com/photo-1486239486342-c09e52de305b?auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1422112528461-3186878f87dc?auto=format&fit=crop&w=1267&q=80",
    "https://images.unsplash.com/photo-1452800211967-5baebe2b8ce2?auto=format&fit=crop&w=1778&q=80",
    "https://images.unsplash.com/photo-1505280256396-f1791f2eb488?auto=format&fit=crop&w=1349&q=80",
    "https://images.unsplash.com/photo-1506183915311-3c4749d0ac8e?auto=format&fit=crop&w=1267&q=80",
    "https://images.unsplash.com/photo-1504163782861-f53c245f6086?auto=format&fit=crop&w=854&q=80",
    "https://images.unsplash.com/photo-1433961050574-322241b350f1?auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1434025697302-54853b8da166?auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1445265005361-ae273d6a1e16?auto=format&fit=crop&w=1351&q=80",
    "https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=1778&q=80",
    "https://images.unsplash.com/photo-1484935494280-c21fdf67d5cc?auto=format&fit=crop&w=1350&q=80",
    "http://78.media.tumblr.com/df5be09dd62ca104a695505f82c63204/tumblr_nmuc7maLJU1rkvmpro1_1280.jpg"
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
