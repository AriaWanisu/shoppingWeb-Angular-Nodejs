import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  authForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private auth: AuthService,private router: Router) { }

  ngOnInit(): void {
  }
  
  signin(){
    console.log(this.authForm.value);
    this.auth.signIn(this.authForm.value).subscribe(
      data => {
        if(data.status == true){
          this.router.navigate(['/home'])
        }else{
          alert('Username or Password is incorrect!');
        }
      },
      err => {
        console.log(err);
        alert('Username or Password is incorrect!');
      });
  }

}
