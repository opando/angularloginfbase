import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { moveIn } from '../router.animations';    

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [moveIn()],
  host: {'[@moveIn]': ''}

})
export class LoginComponent implements OnInit {

  error: any;
  token: String;


  constructor(public af: AngularFireAuth, private router: Router) {
    //se uso this.af.authState.subscribe
    this.af.authState.subscribe(auth=>{
      if(auth){
        this.router.navigateByUrl('/members');
      }
    });

   }

   loginFb(){
    //se uso new auth.FacebookAuthProvider()
    var provider = new auth.FacebookAuthProvider();

     this.af.auth.signInWithPopup(provider).then(
       (success) => {
        this.router.navigate(['/members']);
       }       
     ).catch(
       (err) => {
        this.error = err;
       }
     );
   }

   loginGoogle(){
    var provider = new auth.GoogleAuthProvider();

    this.af.auth.signInWithPopup(provider).then(
      (success) => {
       this.router.navigate(['/members']);
       this.token = success.credential.accessToken;
       console.log('token google : '+ this.token);
       
      }       
    ).catch(
      (err) => {
       this.error = err;
       console.log('token error : '+ this.error);
      }
    );
  }

  ngOnInit() {
  }

}





























