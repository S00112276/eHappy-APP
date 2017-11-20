import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  //for login
  email: String;
  password: String;
  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    //create object user for login
    const user = {
      email: this.email,
      password: this.password
    }

    this.authService.authUser(user).subscribe(data => {
      console.log("DBC" + data);
      if (data.email.success) {
        this.authService.storeUserData(data.token, data.user);
        this.flashMessage.show('You are now logged in!', {
          cssClass: 'alert-success',
          timeout: 6000
        });
        this.router.navigate(['dashboard']);
      }
      else {
        this.flashMessage.show(data.messages, {
          cssClass: 'alert-danger',
          timeout: 6000
        });
        this.router.navigate(['dashboard']);
      }
    });

  }
  // for navbar logout
  onLogoutClick() {
    this.authService.logout();
    this.flashMessage.show('You are logged out!', {
      cssClass: 'alert-succes',
      timeout: 3000
    });
    this.router.navigate(['/dashboard']);
    return false;
  }
}
