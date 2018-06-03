import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';
import {AuthenticationService} from '../auth/auth.service'



@Injectable()
export class UsersService {

    constructor(
        private http:Http,
        private router: Router,
        private authenticationService:AuthenticationService) {

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


    getLeaderboard(){

        let barear=`Bearer ${this.authenticationService.token}`
        let headers = new Headers({'Authorization':barear});
        let options = new RequestOptions({headers:headers});
        console.log(barear);
        return this.http.get('/api/users/allusers?orderbypoints=true',options)
            .map(res => res.json()).catch(this.handleError);
    }

    getUserpoints(email) {
        let barear=`Bearer ${this.authenticationService.token}`
        let headers = new Headers({'Authorization':barear});
        let options = new RequestOptions({headers:headers});
        return this.http.get('/api/users/userinfo/'+email,options)
            .map(res => res.json()).catch(this.handleError);
    }
}
