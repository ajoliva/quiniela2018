import { Component } from '@angular/core';
import {GamesService} from '../services/games-api/games.service'
import { AuthenticationService } from '../services/auth/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {EditModalComponent} from './edit-modal/edit-modal.component';


@Component({
  selector: 'ngx-projections',
  styleUrls: [],
  templateUrl: './projections.component.html',
  providers: [GamesService]
})
export class ProjectionsComponent  {

  private userId:any;
  public rows:any;
  public games:any;

  constructor(private gamesService:GamesService,private authenticationService:AuthenticationService,private modalService: NgbModal){
    this.userId = this.authenticationService.userId;
    console.log('userid',this.userId);
    
  }

  getGames(userId){
    this.gamesService.getGames().subscribe(data=>{
      console.log(data.results)
      let tempDate;
      data.results.forEach(element => {
        tempDate = new Date(element.date);
        element.dateLocal=tempDate.toLocaleDateString("es-GT");
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


  setProjection(gameId,team1,team2,teamId1,teamId2,date) {
    const activeModal = this.modalService.open(EditModalComponent, { size: 'lg', container: 'nb-layout' });
    console.log('set projection date:',date);
    activeModal.componentInstance.modalHeader = 'Ingresa tu Predicción';
    activeModal.componentInstance.gameId = gameId;
    activeModal.componentInstance.team1 = team1;
    activeModal.componentInstance.team2 = team2;
    activeModal.componentInstance.teamId1 = teamId1;
    activeModal.componentInstance.teamId2 = teamId2;
    activeModal.componentInstance.date = date;
    activeModal.componentInstance.userId = this.userId;
    activeModal.componentInstance.predictionDate = (new Date());
  }
}
