// The auth guard is used to prevent unauthenticated users from accessing restricted routes, it's used in app.routing.ts to protect the home page route
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './auth.service';
 
@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private router: Router ) { }
 
    canActivate() {
        
        let user:any;
        if (localStorage.getItem('currentUser')) {
            user=JSON.parse(localStorage.getItem('currentUser'));
            if(user.isActive===1){
                return true
            }
            
            return false;
        }
 
        // not logged in so redirect to login page
        
        this.router.navigate(['/login']);
        return false;
    }
}