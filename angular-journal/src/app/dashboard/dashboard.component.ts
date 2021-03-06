import { Component, OnInit, HostListener } from '@angular/core';
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
  hidemodal = true;
  hidedropdown = true;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
      if (event.keyCode === 27) {
        this.hidemodal = true;
      }
  }

  grabUser(){
    this._mainService.GrabCurrentUser().then(data => {
      this.currentUser = data;
      // if(data.email == 'none') {
      //   this._router.navigateByUrl('');        
      // }
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

  showModal(){
    this.hidemodal = false;
  }

  hideModal(){
    this.hidemodal = true;
  }

  dropDown(){
    if (this.hidedropdown){
      this.hidedropdown = false;
    } else {
      this.hidedropdown = true;
    }
  }

  goSettings(){
    this._router.navigateByUrl('settings');
  }

}
