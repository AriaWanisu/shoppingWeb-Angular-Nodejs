import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { LocalStorageService } from 'angular-web-storage';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  id: string;

  passwordForm = new FormGroup({
    password:   new FormControl('',[Validators.required,Validators.minLength(8)]),
    newPassword:    new FormControl('',[Validators.required,Validators.minLength(8)]),
    newPasswordCheck:    new FormControl('',[Validators.required,Validators.minLength(8)]),
  })

  constructor(public local: LocalStorageService, private us: UserService) { }

  ngOnInit(): void {
  }

  changPWD(){
    this.id = this.local.get('user').result.id;
    this.us.changePassword(this.id, this.passwordForm.value).subscribe(
      data => {
        if(data.pwdstatus == true){
          alert(data.data.message)
        } else {
          alert('Password incorrect!');
        }
      },
      err => {
        console.log(err);
        alert('Error!!');
      });
  }

  get password(){
    return this.passwordForm.get('password');
  }

  get newPassword(){
    return this.passwordForm.get('newPassword');
  }

  get newPasswordCheck(){
    return this.passwordForm.get('newPasswordCheck');
  }

}
