import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from '../services/auth/auth.service';

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  providers:[AuthenticationService,]
})
export class LoginComponent {
    public form: any;
  public email: any;
  public password: any;
  public submitted: boolean = false;
  public error:any;
  model: any = {};


  public serverList: any;

  constructor(private authenticationService: AuthenticationService,private router: Router) {

  }

  ngOnInit() {
    // reset login status
    /* this.authenticationService.logout(); */

  }

  ngAfterViewInit(){
    
  }


  public login(): void {
    this.submitted = true;

    console.log(this.model)
    // your code goes here
    // console.log(values);

    

     this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(result => {
        if (result === true) {
          // login successful
          console.log('success on login');
          this.router.navigate(['/pages/projections']);
        } else {
          // login failed
          this.error = 'Usuario o contraseña son incorrectos. Tu usuario puede aún no estar activado.';

        }
      }); 
  }
}
