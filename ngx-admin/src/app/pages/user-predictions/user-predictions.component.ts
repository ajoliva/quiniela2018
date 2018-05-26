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
    console.log('userid',this.userId);
    
  }

  getGames(userId){
    this.gamesService.getPredictions(userId).subscribe(data=>{
      console.log(data.results)
      let tempDate;
      data.results.forEach(element => {
        tempDate = new Date(element.PredictionDate);
        element.dateLocal=tempDate.toLocaleDateString("es-GT");
      });

      this.predictions=data.results;
    })
  }
  
  

  ngAfterViewInit(){
    this.getGames(this.userId);
  }



  updateProjection(scoreTeam1,scoreTeam2,winnerId,predictionId,teamName1,teamName2) {
    const activeModal = this.modalService.open(EditModalComponent, { size: 'sm', container: 'nb-layout' });
    
    activeModal.componentInstance.modalHeader = 'Cámbia tu Predicción';
    activeModal.componentInstance.scoreTeam1 = scoreTeam1;
    activeModal.componentInstance.scoreTeam2 = scoreTeam2;
    activeModal.componentInstance.predictionId = predictionId;
    activeModal.componentInstance.winnerId = winnerId;
    activeModal.componentInstance.teamName1 = teamName1;
    activeModal.componentInstance.teamName2 = teamName2;
    activeModal.componentInstance.userId = this.userId;
    activeModal.componentInstance.model.scoreTeam1 = scoreTeam1;
    activeModal.componentInstance.model.scoreTeam2 = scoreTeam2;
    
  }
}
