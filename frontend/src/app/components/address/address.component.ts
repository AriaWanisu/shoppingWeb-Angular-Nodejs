import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { LocalStorageService } from 'angular-web-storage';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  addAddress: boolean;

  color: string = '#1895f5';
  token: string;
  id: string;
  email: string;
  user: any

  addressForm = new FormGroup({
    street:   new FormControl(null,[Validators.required]),
    state:    new FormControl('',[Validators.required]),
    city:     new FormControl('',[Validators.required]),
    province: new FormControl('',[Validators.required]),
    country:  new FormControl('',[Validators.required]),
    zip:      new FormControl('',[Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
  })

  constructor(public local: LocalStorageService,private us: UserService,private router: Router) {
    this.addAddress = false;
    try {
      this.token = this.local.get('user').token;
      this.email = this.local.get('user').result.email;
      console.log(this.local.get('user'))
      this.us.getUser(this.token, this.email).subscribe(
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

  ngOnInit(): void {
  }

  updateAddress(){
    console.log(this.addressForm.value);
    this.token = this.local.get('user').token;
    console.log(this.token);
    this.id = this.local.get('user').result.id;
    this.us.addAddress(this.token, this.id, this.addressForm.value).subscribe(
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

  openAddAddress(){
    this.addAddress = true;
  }

  changeColor(){
    this.color = '#adadad';
  }

  get street(){
    return this.addressForm.get('street');
  }

  get state(){
    return this.addressForm.get('state');
  }

  get city(){
    return this.addressForm.get('city');
  }

  get province(){
    return this.addressForm.get('province');
  }
  
  get country(){
    return this.addressForm.get('country');
  }

  get zip(){
    return this.addressForm.get('zip');
  }
}
