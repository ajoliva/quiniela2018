import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {GamesService} from '../../services/games-api/games.service'

@Component({
  selector: 'ngx-modal',
  templateUrl: './edit-modal.component.html',
  providers:[ GamesService]
})
export class EditModalComponent {

  modalHeader: string;
  modalContent = `Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
    nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
    nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.`;
    public gameId:any;
  public scoreTeam1:any;
  public scoreTeam2:any;
  public team1:any;
  public team2:any;
  public teamId1:any;
  public teamId2:any;
  public predictionDate:any;
  public date:any;
  public userId:any;
  public model: any = {};

  constructor(private activeModal: NgbActiveModal,private gamesService:GamesService) { }


  setPrediction(){
      
      if(this.model){
        console.log('ready to set score!',this.userId);
        
        this.gamesService.setPrediction(this.gameId,this.model.scoreTeam1,this.model.scoreTeam2,this.teamId1,this.teamId2,this.date,this.userId,null,this.predictionDate).subscribe(data=>{
            console.log('setGameScores:',data);
            this.closeModal();
        })
      }
  }

  closeModal() {
    this.activeModal.close();
  }
}
