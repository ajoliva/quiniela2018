import { Component } from '@angular/core';
import {GamesService} from '../services/games-api/games.service'
import { AuthenticationService } from '../services/auth/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {EditModalComponent} from './edit-modal/edit-modal.component';


@Component({
  selector: 'ngx-projections',
  styleUrls: [],
  templateUrl: './game-admin.component.html',
  providers: [GamesService]
})
export class GameAdminComponent  {

  private userId:any;
  public rows:any;
  public games:any;

  constructor(private gamesService:GamesService,private authenticationService:AuthenticationService,private modalService: NgbModal){
    this.userId = this.authenticationService.userId;
    
    
  }

  getGames(userId){
    this.gamesService.getGames().subscribe(data=>{
      
      let tempDate;
      data.results.forEach(element => {
        tempDate = new Date(element.date);
        element.dateLocal=tempDate.toLocaleDateString("es-GT");
        if(typeof element.QualifyId !== 'undefined' && null !== element.QualifyId){
          if(element.QualifyId==element.teamId1){
            element['QualifyName']=element.teamName1
          }else if(element.QualifyId==element.teamId2){
            element['QualifyName']=element.teamName2
          }else{
            element['QualifyName']='N/A';
          }
        }else{
          element['QualifyName']='N/A';
        }
      });

      this.games=data.results;
      

    })
  }
  
  

  ngAfterViewInit(){
    this.getGames(this.userId);
  }


  parseDate(date){
    
    return "hola";
  }


  setProjection(gameId,team1,team2,teamId1,teamId2,date,QualifyId,fase,scoreTeam1,scoreTeam2) {
    const activeModal = this.modalService.open(EditModalComponent, { size: 'lg', container: 'nb-layout' });
    
    activeModal.componentInstance.modalHeader = 'Ingresa tu Predicción';
    activeModal.componentInstance.gameId = gameId;
    activeModal.componentInstance.team1 = team1;
    activeModal.componentInstance.team2 = team2;
    activeModal.componentInstance.teamId1 = teamId1;
    activeModal.componentInstance.teamId2 = teamId2;
    activeModal.componentInstance.date = date;
    activeModal.componentInstance.userId = this.userId;
    activeModal.componentInstance.QualifyId=QualifyId;
    activeModal.componentInstance.fase=fase;
    activeModal.componentInstance.predictionDate = (new Date());
    activeModal.componentInstance.model.scoreTeam1 = scoreTeam1;
    activeModal.componentInstance.model.scoreTeam2 = scoreTeam2;
  }
}
