import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { TransportService } from '../../services/transport.service'
import { CodeService } from '../../services/code.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cart: any;

  token: string;
  singend: number;
  name: string;
  item: any;
  transport: any;
  sumPrice: number = 0;
  code = new FormControl('');
  getCode: boolean = false;
  codeDiscount: any;

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
    phone: new FormControl('',[Validators.required, Validators.pattern(/^0[0-9]{9}/), Validators.minLength(10), Validators.maxLength(10)]),
  });

  constructor(public local: LocalStorageService,private auth: AuthService,private router: Router, private cs: CartService,private ps: ProductService, private ts: TransportService, private codes: CodeService) {
    
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

  toCart(){
    this.router.navigate(['/cart'])
  }

  getCounter(){
    return this.cs.getCounter();
  }

  getSumPrice(){
    return this.cs.getsumPrice();
  }

  get firstName(){
    return this.profileForm.get('firstName');
  }

  get lastName(){
    return this.profileForm.get('lastName');
  }

  get sex(){
    return this.profileForm.get('sex');
  }

  get email(){
    return this.profileForm.get('email');
  }

  get password(){
    return this.profileForm.get('password');
  }

  get phone(){
    return this.profileForm.get('phone');
  }

  getCart(){
    var i;
    this.getTransport()
    const uid = this.local.get('user').result.id
    this.cart = this.cs.getCart(uid).subscribe(
      (data) => {
        this.cart = data;
        console.log(this.cart);
        if(this.local.get('sumPrice') == null){
          for (i = 0; i < data.length; i++) {
            console.log("if work");
            this.sumPrice = this.local.get('sumPrice')
            this.sumPrice += this.cart[i].price;
            this.local.set('sumPrice', this.sumPrice, 1, 'w');
          }
        }
        
      },
      (err) => {
        this.router.navigate(['/']);
      }
    );
  }

  delete(cid: string, pid: string){
    this.ps.getSomeProduct(pid).subscribe(
      (data) => {
        console.log("Delete Work")
        console.log(data);
        this.cs.deleteCart(cid).subscribe(
          (result) => {
            this.cs.inPro(data).subscribe(
              (data) => {
                alert("ลบสินค้าออกจากตระกล้า")
                this.getCart();
              }
            ),
            (err) => {

            }
          },
          (err) => {
           
          }
        );
      },
      (err) => {

      }
    )
  }

  getTransport(){
    console.log('work')
    try{
      this.ts.getTransport().subscribe(
        data => {
          this.transport = data;
          console.log(this.transport)
        },
        err => {
          console.log(err)
        });
    }catch(error){
      console.log(error)
    }
  }

  selectTrasprot(transport: any){
    console.log("select");
    console.log(transport)
  }

  use(){
    console.log(this.code.value);
    if(this.code.value != ""){
      this.codes.useCode(this.code.value).subscribe(
        data=>{
          this.codeDiscount = data
          this.getCode = true;
          this.sumPrice = this.local.get('sumPrice')
          this.sumPrice -= this.codeDiscount.discount;
          this.local.set('sumPrice', this.sumPrice, 1, 'w');
        },
        err => {
          alert("โค้ดหมดแล้ว")
        })
    }
    
  }

}
