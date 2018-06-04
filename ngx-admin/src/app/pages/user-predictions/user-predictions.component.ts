import { Component } from '@angular/core';
import {GamesService} from '../services/games-api/games.service'
import { AuthenticationService } from '../services/auth/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {EditModalComponent} from './edit-modal/edit-modal.component';


@Component({
  selector: 'ngx-projections',
  styleUrls: [],
  templateUrl: './user-predictions.component.html',
  providers: [GamesService]
})
export class UserPredictionsComponent  {

  private userId:any;
  public rows:any;
  public predictions:any;

  constructor(private gamesService:GamesService,private authenticationService:AuthenticationService,private modalService: NgbModal){
    this.userId = this.authenticationService.userId;
    

  }

  getGames(userId){
    this.gamesService.getPredictions(userId).subscribe(data=>{
      
      let tempDate;
      data.results.forEach(element => {
        tempDate = new Date(element.PredictionDate);
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

      this.predictions=data.results;
    })
  }



  ngAfterViewInit(){
    this.getGames(this.userId);
  }



  updateProjection(scoreTeam1,scoreTeam2,teamId1,teamId2,winnerId,predictionId,teamName1,teamName2,QualifyId) {
    const activeModal = this.modalService.open(EditModalComponent, { size: 'lg', container: 'nb-layout' });

    activeModal.componentInstance.modalHeader = 'Cámbia tu Predicción';
    activeModal.componentInstance.scoreTeam1 = scoreTeam1;
    activeModal.componentInstance.scoreTeam2 = scoreTeam2;
    activeModal.componentInstance.teamId1 = teamId1;
    activeModal.componentInstance.teamId2 = teamId2;
    activeModal.componentInstance.predictionId = predictionId;
    activeModal.componentInstance.winnerId = winnerId;
    activeModal.componentInstance.teamName1 = teamName1;
    activeModal.componentInstance.teamName2 = teamName2;
    activeModal.componentInstance.userId = this.userId;
    activeModal.componentInstance.model.scoreTeam1 = scoreTeam1;
    activeModal.componentInstance.model.scoreTeam2 = scoreTeam2;
    activeModal.componentInstance.model.QualifyId = QualifyId

  }
}
