import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  private authService = inject(AuthService);
  private router = inject(Router)

  public finishedAuthChecking = computed<boolean>( () => {
    if (this.authService.authStatus() === AuthStatus.checking) {
      return false;
    }

    return true;
  });

  public authStatusChangedEffects = effect(()=> {

    switch (this.authService.authStatus()) {
      case AuthStatus.checking:
        return;

      case AuthStatus.authenticated:
         this.router.navigateByUrl('/dashboard')
        break;
      
        case AuthStatus.notAuthenticated:
          this.router.navigateByUrl('/auth/login')
        return;
    }
    console.log('authStatus', this.authService.authStatus())
  });


}
