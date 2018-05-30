import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { moveIn } from '../router.animations';    

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css'],
  animations: [moveIn(), fallIn()],
  host: {'[@moveIn]': ''}
})
export class EmailComponent implements OnInit {

  error:  any;


  constructor(public af: AngularFireAuth, private router: Router) {


   }

   onSubmit(formData) {
    if(formData.valid) {
      console.log(formData.value);

      this.af.auth.signInWithEmailAndPassword(
        formData.value.email,
        formData.value.password
      ).then(
        (success) => {
          console.log(success);
          this.router.navigate(['/members'])
        }        
      ).catch(
        (err) => {
          console.log('error signup : '+ err);
          this.error = err;
        }
      );

     
    }
  }
  

  ngOnInit() {
  }

}
