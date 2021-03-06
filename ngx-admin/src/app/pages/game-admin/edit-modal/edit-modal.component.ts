import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GamesService } from '../../services/games-api/games.service'


@Component({
  selector: 'ngx-modal',
  templateUrl: './edit-modal.component.html',
  providers: [GamesService]
})
export class EditModalComponent {

  modalHeader: string;
  modalContent = `Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
    nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
    nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.`;
  public gameId: any;
  public scoreTeam1: any;
  public scoreTeam2: any;
  public team1: any;
  public team2: any;
  public teamId1: any;
  public teamId2: any;
  public predictionDate: any;
  public date: any;
  public userId: any;
  public model: any = {};
  public error: any;
  public fase:any;
  public QualifyId: any=null;

  constructor(private activeModal: NgbActiveModal, private gamesService: GamesService) {

  }


  showQualifyIdFormEntry(){
    let enable =  (this.fase>1) && (this.model.scoreTeam1==this.model.scoreTeam2)
    if(!enable){
      this.model.QualifyId=null;
    }

    return enable
  }

  setGameScores() {

    if (this.model) {

      console.log("scores:"," "+this.model.scoreTeam1+" "+this.model.scoreTeam2);
        
      if(typeof this.model.QualifyId == 'undefined' || null == this.model.QualifyId){
        this.model.QualifyId='';
      }

      this.gamesService.setGameScores(this.gameId, this.model.scoreTeam1, this.model.scoreTeam2,this.model.QualifyId).subscribe(data => {

        this.closeModal();


      }, err => {
        this.error = "No es posible agregar predicción o ya se agregó antes."
      })
    }
  }

  closeModal() {
    this.activeModal.close();
  }
}
