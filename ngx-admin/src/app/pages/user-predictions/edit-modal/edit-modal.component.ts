import { Component,AfterViewInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {GamesService} from '../../services/games-api/games.service'

@Component({
  selector: 'ngx-modal',
  templateUrl: './edit-modal.component.html',
  providers:[ GamesService]
})
export class EditModalComponent implements AfterViewInit {

  modalHeader: string;
  modalContent = `Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
    nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
    nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.`;
    public gameId:any;
  public scoreTeam1:any;
  public scoreTeam2:any;
  public predictionId:any;
  public teamName1:any;
  public teamName2:any;
  public teamId1: any;
  public teamId2: any;
  public winnerId:any;
  public date:any;
  public userId:any;
  public model: any = {};
  public error:any;
  public QualifyId:any;
  public fase:any;


  public number=0;

  constructor(private activeModal: NgbActiveModal,private gamesService:GamesService) {



  }

  showQualifyIdFormEntry(){
    let enable =  (this.fase>1) && (this.model.scoreTeam1==this.model.scoreTeam2)
    if(!enable){
      this.model.QualifyId=null;
    }

    return enable
  }

  ngAfterViewInit(){
    this.gamesService.getGame(this.gameId).subscribe(data=>{

      this.fase=data.results[0].Fase;
    });
  }

  getQualifyText(){
    console.log(this.QualifyId)
    if(typeof this.QualifyId !== 'undefined' && null !== this.QualifyId){
      if(this.QualifyId == this.teamId1){
        return `Ganador en penales: ${this.teamName1}`;
      }else if(this.QualifyId == this.teamId2){
        return `Ganador en penales: ${this.teamName2}`;
      }else{
        return `Ganador en penales`
      }
    }
    return `Especificar`;
  }
  updatePrediction(){
      if(this.model){
        if(typeof this.model.QualifyId == 'undefined' || null == this.model.QualifyId){
          this.model.QualifyId=null;
        }

        this.gamesService.updatePrediction(this.model.scoreTeam1,this.model.scoreTeam2,this.teamId1,this.teamId2,this.winnerId,this.predictionId,this.gamesService.parseDate(new Date()),this.model.QualifyId).subscribe(data=>{
          this.activeModal.close();

        }, err => {
          this.error = "No es posible actualizar la predicción, o ya se venció el tiempo."
        })
      }
  }

  closeModal() {
    this.activeModal.close();
  }
}
