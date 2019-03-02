import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {RegisterService} from '../services/auth/register.service';

@Component({
  selector: 'register-component',
  templateUrl: './register.component.html',
  providers:[RegisterService]
})
export class RegisterComponent {
    public form: any;
  public email: any;
  public password: any;
  public submitted: boolean = false;
  public error = '';
  model: any = {};


  public serverList: any;

  constructor(private registerService: RegisterService,private router: Router) {

  }

  ngOnInit() {
    // reset login status
    /* this.authenticationService.logout(); */

  }

  ngAfterViewInit(){
    
  }


  public register(): void {
    this.submitted = true;

    console.log(this.model)
    // your code goes here
    // console.log(values);

    

     this.registerService.register(this.model.name,this.model.username,this.model.email, this.model.password)
      .subscribe(result => {

        console.log("Successfull Registration!",result);
        this.router.navigate(['/login']);

      }); 
  }
}
