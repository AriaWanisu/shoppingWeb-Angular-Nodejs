import { Injectable } from '@angular/core';
import { ProductService } from './product.service'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { LocalStorageService } from 'angular-web-storage'

@Injectable({
  providedIn: 'root'
})
export class CartService {

  product: any;
  counter: number = 0;
  sumPrice: number = 0;
  cart: any;
  body: any;

  constructor(private http: HttpClient, private productService: ProductService, public local: LocalStorageService) { }

  add(uid: String,cartData: any){
    console.log("add cart Work")
    return this.http.post<any>('http://localhost:3000/api/carts/'+uid, cartData)
     .pipe(map(data => {
       if(data){
         this.sumPrice = this.local.get('sumPrice')
         this.sumPrice += cartData.price;
         this.local.set('sumPrice', this.sumPrice, 1, 'w');
         console.log("sumPrice "+ this.sumPrice)
         console.log("local " + this.local.get('sumPrice'))
       }
       return data;
     }));
  }

  getCart(id: any){
    const url = 'http://localhost:3000/api/cart/'

    console.log(url+id);

    return this.http.get<any>(url+id)
      .pipe(map(data => {
        if(data){
          this.cart = data
        }
        return data;
      }));
  }

  deleteCart(cid: any,){
    const url = 'http://localhost:3000/api/cart/'

    console.log("delete Work!")

    return this.http.delete<any>(url+cid)
      .pipe(map(data => {
        if(data){
        }
      }));
  }

  inPro(product: any){
    console.log("inPro Work!!")
    this.sumPrice = this.local.get('sumPrice')
    this.sumPrice -= product.price;
    this.local.set('sumPrice', this.sumPrice, 1, 'w');
    return this.http.put<any>('http://localhost:3000/api/updateproducts', product)
    .pipe(map(data => {
      console.log(data)
    }))
  }

  getCounter(){
    return this.counter;
  }

  getsumPrice(){
    return this.local.get('sumPrice');
  }

}
