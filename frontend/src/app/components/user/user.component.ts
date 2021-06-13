import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { LocalStorageService } from 'angular-web-storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  
  token: string;
  id: string;
  user: any;
  edit: boolean = false;

  previewLoaded: boolean = false

  profileForm = new FormGroup({
    firstName: new FormControl('',[Validators.required]),
    lastName: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required, Validators.email]),
    img: new FormControl('',[Validators.required]),
    phone: new FormControl('',[Validators.required, Validators.pattern(/^0[0-9]{9}/), Validators.minLength(10), Validators.maxLength(10)]),
  });

  constructor( public local: LocalStorageService,private us: UserService,private router: Router) {
    try {
      this.token = this.local.get('user').token;
      this.id = this.local.get('user').result.email;
      this.us.getUser(this.token, this.id).subscribe(
        (data) => {
          this.user = data;
        },
        (err) => {
          this.router.navigate(['/']);
        }
      );
    } catch (error) {
      console.log(error);
      this.router.navigate(['/']);
    }
    
  }

  ngOnInit(): void {}

  openEdit(){
    this.edit = !this.edit;
    this.profileForm.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      img: this.user.img,
      phone: this.user.phone
    });
  }

  onChangeImg(e:any){
    if(e.target.files.length > 0){
      const file = e.target.files[0]
      var pattern  = /image-*/;
      const reader = new FileReader()
      if(!file.type.match(pattern)){
        alert('invalid format')
        this.profileForm.reset()
      }else{
        reader.readAsDataURL(file)
        reader.onload = () => {
          this.previewLoaded = true
          this.profileForm.patchValue({
            img: reader.result
          })
        }
      }
    }
  }

  updateUser(){
    console.log( this.profileForm.value)
    this.id = this.local.get('user').result.id;
    this.us.updateUser(this.id, this.profileForm.value).subscribe(
      data => {
        if(data.status == true){
          alert(data.data.message)
          window.location.reload();
        }else{
          alert('Address incorrect!');
        }
      },
      err => {
        console.log(err);
        alert('Error!!');
      });
  }

  get firstName(){
    return this.profileForm.get('firstName');
  }

  get lastName(){
    return this.profileForm.get('lastName');
  }

  get phone(){
    return this.profileForm.get('phone');
  }

  get img(){
    return this.profileForm.get('img');
  }
}
