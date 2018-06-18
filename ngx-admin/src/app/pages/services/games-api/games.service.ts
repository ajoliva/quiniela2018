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
export class GamesService {

    constructor(private http:Http,
    private router: Router,private authenticationService:AuthenticationService){

    }

    parseDate(str){


            let date = new Date(str);


        let year = date.getFullYear();
        let day = ("0" + date.getDate()).slice(-2);
        let month = ("0" + (date.getMonth() + 1)).slice(-2)
        let hour = ("0" + date.getHours()).slice(-2);
        let min = ("0" + date.getMinutes()).slice(-2);

        return `${year}-${month}-${day} ${hour}:${min}:00`;
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


    getPredictions(userId){

        let barear=`Bearer ${this.authenticationService.token}`
        let headers = new Headers({'Authorization':barear});
        let options = new RequestOptions({headers:headers});
        return this.http.get('/api/predictions/user/'+userId,options)
            .map(res => res.json()).catch(this.handleError);
    }

    getGame(gameId){

        let barear=`Bearer ${this.authenticationService.token}`
        let headers = new Headers({'Authorization':barear});
        let options = new RequestOptions({headers:headers});
        return this.http.get('/api/games/'+gameId,options)
            .map(res => res.json()).catch(this.handleError);
    }

    getGames(){

        let barear=`Bearer ${this.authenticationService.token}`
        let headers = new Headers({'Authorization':barear});
        let options = new RequestOptions({headers:headers});
        return this.http.get('/api/games/gamelist',options)
            .map(res => res.json()).catch(this.handleError);
    }

    setGameScores(gameId,scoreTeam1,scoreTeam2,qualifyId){
        
        let body = `scoreTeam1=${scoreTeam1}&scoreTeam2=${scoreTeam2}&qualifyId=${qualifyId}`;
        console.log("body:",body)
        let barear=`Bearer ${this.authenticationService.token}`
        let headers = new Headers({'Authorization':barear,'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({headers:headers});
        return this.http.patch('/api/games/'+gameId+'/scores',body,options)
            .map(res => res.json()).catch(this.handleError);
    }

    setPrediction(gameId,scoreTeam1,scoreTeam2,teamId1,teamId2,date,userId,winnerId,predictionDate,QualifyId){

        if(scoreTeam1>scoreTeam2){
            winnerId=teamId1;
        }else if(scoreTeam1<scoreTeam2){
            winnerId=teamId2;
        }else{
            winnerId=33;
        }
        //Fix de fechas malas
        //mandando un default que es ignorado despues
        date = "2018-06-15 00:00:00";
        predictionDate = "2018-06-15 00:00:00";

        
        let body = `gameId=${gameId}&userId=${userId}&scoreTeam1=${scoreTeam1}&scoreTeam2=${scoreTeam2}&GameDate=${date}&teamId1=${teamId1}&teamId2=${teamId2}&WinnerId=${winnerId}&PredictionDate=${predictionDate}&qualifyId=${QualifyId}`;

        let barear=`Bearer ${this.authenticationService.token}`
        let headers = new Headers({'Authorization':barear,'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({headers:headers});
        return this.http.post('/api/predictions/',body,options)
            .map(res => res.json()).catch(this.handleError);
    }

    updatePrediction(scoreTeam1,scoreTeam2,teamId1,teamId2,winnerId,predictionId,date,QualifyId){
        
        if(scoreTeam1>scoreTeam2){
            winnerId=teamId1;
        }else if(scoreTeam1<scoreTeam2){
            winnerId=teamId2;
        }else{
            winnerId=33;
        }
        date = this.parseDate(date);
        let body = `scoreTeam1=${scoreTeam1}&scoreTeam2=${scoreTeam2}&winnerId=${winnerId}&qualifyId=${QualifyId}`;

        let barear=`Bearer ${this.authenticationService.token}`
        let headers = new Headers({'Authorization':barear,'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({headers:headers});
        return this.http.patch('/api/predictions/'+predictionId,body,options)
            .map(res => res.json()).catch(this.handleError);
    }
}
