import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../app/shared/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onLogoutClick() {
    this.authService.logout();
    this.flashMessage.show('You are now logged out!', {
      cssClass: 'alert-success',
      timeout: 6000 //6 sec
    });
    this.router.navigate(['']);
    return false;
  }

}
