import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { TransportService } from '../../services/transport.service'
import { CodeService } from '../../services/code.service';
import { TierService } from '../../services/tier.service';
import { UserService } from '../../services/user.service';
import { PaidService } from '../../services/paid.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: any;

  token: string;
  name: string;
  item: any;
  transport: any;
  sumPrice: number = 0;
  user: any;
  code = new FormControl('');
  codeDiscount: any;
  tier: any;
  id: any;

  constructor(public local: LocalStorageService,private auth: AuthService,private router: Router, private cs: CartService,private ps: ProductService, private ts: TransportService, private codes: CodeService,private tiers: TierService, private us: UserService,private paidservices: PaidService) {
    this.getUser();
    this.getCart();
    this.getTransport();
    this.local.set("select",-1,1,'w')
  }

  ngOnInit(): void {
  }

  getSumPrice(){
    return this.cs.getsumPrice();
  }

  getUser(){
    this.token = this.local.get('user').token;
      this.id = this.local.get('user').result.email;
      this.us.getUser(this.token, this.id).subscribe(
        (data) => {
          this.user = data;
          this.getUserTier();
        },
        (err) => {
          this.router.navigate(['/']);
        })
  }

  getUserTier(){
    this.tiers.getTier(this.user.tier).subscribe(
      (data) => {
        this.tier = data
        if(this.local.get('count') == null || this.local.get('count') == 0){
          this.sumPrice = this.local.get('sumPrice')
          this.sumPrice -= this.tier.special
          this.local.set('sumPrice', this.sumPrice, 1, 'w');
          this.local.set('count', 1, 1, 'w');
        }
      }
    )
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

  paidCart(user: any){
    console.log("------------------------------");
    console.log(user);
    this.paidservices.paid(user).subscribe(
      (data) => {
        console.log("paid Work")
        this.paidservices.upgradeUser(user).subscribe(
          (data) => {
            console.log("upgrade work");
            alert("ชำระเงินเสร็จสิ้น")
            this.local.set('sumPrice',0,1,'w')
            this.local.set('count',0,1,'w')
            this.local.set('counter',0,1,'w');
            this.local.set('usedCode', false, 1, 'w');
            window.location.reload()
          },
          (err) => {
    
          }
        )
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

  selectTrasprot(transportprice: any){
    
    console.log(transportprice)
    if(this.local.get('checkTrasport') == null || this.local.get('checkTrasport') == 0){
      console.log("select 1");
      this.local.set("select",1,1,'w')
      this.local.set('checkTrasport', transportprice,1,'w');
      this.sumPrice = this.local.get('sumPrice')
      this.sumPrice += transportprice
      this.local.set('sumPrice', this.sumPrice, 1, 'w');
    }else{
      console.log("select 2");
      this.local.set("select",1,1,'w')
      this.sumPrice = this.local.get('sumPrice')
      console.log(this.sumPrice)
      this.sumPrice -= this.local.get('checkTrasport')
      console.log(this.sumPrice);
      this.sumPrice += transportprice
      console.log(this.sumPrice);
      
      this.local.set('sumPrice', this.sumPrice, 1, 'w');
      this.local.set('checkTrasport', transportprice,1,'w');
    }
  }

  use(){
    console.log(this.code.value);
    if(this.code.value != ""){
      this.codes.useCode(this.code.value).subscribe(
        data=>{
          this.codeDiscount = data
          this.local.set('usedCode', true, 1, 'w');
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
