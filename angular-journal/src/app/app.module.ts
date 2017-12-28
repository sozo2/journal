import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LogregComponent } from './logreg/logreg.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'; 
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { MainService } from './main.service';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [
    AppComponent,
    LogregComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
    exports: [
    RouterModule
  ],
  providers: [MainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
