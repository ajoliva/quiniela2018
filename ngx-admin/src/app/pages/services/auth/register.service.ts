import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';



@Injectable()
export class RegisterService {
    
    constructor(private http:Http,
    private router: Router){
       
    }

    handleError (error: Response | any,obj) {
        let errMsg: string;
        
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
            if (error.status === 401 ){
               localStorage.removeItem('currentUser');
            }
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
    }


    register(username,email,password){
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let body = `username=${username}&password=${password}&email=${email}`;
        let options = new RequestOptions({headers:headers});
        return this.http.post('/api/users/register',body,options)
            .map(res => {

                
                this.router.navigate(['/login'])

            })
    }

    

}