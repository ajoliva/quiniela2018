import { Component } from '@angular/core';
import {UsersService} from '../services/users-api/users.service'
import { AuthenticationService } from '../services/auth/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'ngx-userpoints',
  styleUrls: [],
  templateUrl: './userpoints.component.html',
  providers: [UsersService]
})
export class UserpointsComponent  {

  private userId:any;
  private email:any;
  public rows:any;
  public userData:any;

  constructor(
    private usersService:UsersService,
    private authenticationService:AuthenticationService,
    private modalService: NgbModal){
      console.log(authenticationService);
    this.userId = this.authenticationService.userId;
    this.email = this.authenticationService.email;
    console.log(this.email);
    
  }

  getUserpoints(){
    console.log(this.email);
    this.usersService.getUserpoints(this.email).subscribe(data=>{
      this.userData=data.results;
    })
  }
  
  

  ngAfterViewInit(){
    this.getUserpoints();
  }
}
