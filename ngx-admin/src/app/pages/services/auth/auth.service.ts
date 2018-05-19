import { Injectable } from '@angular/core';
import { Http, Headers, Response,RequestOptions  } from '@angular/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map'


@Injectable()
export class AuthenticationService {
    public token: string;
    public email: string;

 
    constructor(private http: Http,private router:Router) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        this.token = currentUser && currentUser.token;
        

    }

    login(email: string, password: string): Observable<boolean> {
        let body = `email=${email}&password=${password}`;
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        return this.http.post('/api/users/login', body, { headers: headers })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                console.log('response',response);
                let token = response.json() && response.json().token;
                let name = response.json().name;
                let email = response.json().email;
                let userId = response.json().userId;
                let isAdmin = response.json().isAdmin;
                let isActive = response.json().isActive;
                if (token) {
                    // set token property
                    this.token = token;
                    this.email = email;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: email, token: token, name:name,userid:userId,isAdmin:isAdmin,isActive:isActive }));
                    
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        
        this.token = null;
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
        
    }


}