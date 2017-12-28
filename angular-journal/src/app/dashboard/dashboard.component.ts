import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../main.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _mainService: MainService, private _router: Router) { }

  currentUser;

  grabUser(){
    this._mainService.GrabCurrentUser().then(data => {
      this.currentUser = data;
      if(data.email == 'none') {
        this._router.navigateByUrl('');        
      }
    }).catch(err => console.log(err));
  }

  logout(){
    this._mainService.LogoutUser().then(data => {
      this._router.navigateByUrl('');
    }).catch();
  }

  ngOnInit() {
    this.grabUser();
  }

}
