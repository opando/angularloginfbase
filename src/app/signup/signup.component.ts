import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { moveIn , fallIn} from '../router.animations';   

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [moveIn(), fallIn()],
  host: {'[@moveIn]': ''}

})
export class SignupComponent implements OnInit {

  error: any;
  state: String;


  constructor(public af: AngularFireAuth, private router: Router) { }

  
  onSubmit(formData) {
    if(formData.valid) {
      console.log(formData.value);
      this.af.auth.createUserWithEmailAndPassword(
        formData.value.email,
        formData.value.password
      ).then(
        (success) => {
        console.log(success);
        this.router.navigate(['/members'])
      }).catch(
        (err) => {
        console.log('error sigup : '+ err);
        this.error = err;
      })
    }
  }

  ngOnInit() {
  }

}
