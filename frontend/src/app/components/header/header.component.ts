import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'
import { LocalStorageService } from 'angular-web-storage'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  token: string;
  singend: number;
  name: string;

  authForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  profileForm = new FormGroup({
    firstName: new FormControl('',[Validators.required]),
    lastName: new FormControl('',[Validators.required]),
    sex: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(8)]),
    phone: new FormControl('',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(10), Validators.maxLength(10)]),
    address: new FormGroup({
     
    })
  });

  constructor(public local: LocalStorageService,private auth: AuthService,private router: Router) {
    if(local.get('user') == null){
      this.singend = 0;
    }else{
      this.singend = 1;
    }
   }

  ngOnInit(): void {
  }

  signin(){
    console.log(this.authForm.value);
    this.auth.signIn(this.authForm.value).subscribe(
      data => {
        if(data.status == true){
          this.router.navigate(['/home'])
          this.name = this.local.get('user').result.username;
        }else{
          alert('Username or Password is incorrect!');
        }
      },
      err => {
        console.log(err);
        alert('Username or Password is incorrect!');
      });
      
  }

  signout(){
    this.local.clear();
  }

  signup(){
    console.log(this.profileForm.value);
    this.auth.signUp(this.profileForm.value).subscribe(
      data => {
        alert('ลงทะเบียนสำเร็จ!!')
      },
      err => {
        console.log(err);
        alert('Username or Password is incorrect!');
      });
  }

}
