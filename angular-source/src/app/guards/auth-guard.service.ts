import { Injectable } from '@angular/core';
import { Router, CanActivate} from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate() {
    if(this.authService.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
