import { Injectable } from '@angular/core';
import { ProductService } from './product.service'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CartService {

  product: any;
  counter: number = 0;
  sumPrice: number = 0;
  cart: any;
  body: any;

  constructor(private http: HttpClient, private productService: ProductService) { }

  add(uid: String,cartData: any){
    console.log("add cart Work")
    return this.http.post<any>('http://localhost:3000/api/carts/'+uid, cartData)
     .pipe(map(data => {
       if(data){
         this.sumPrice += cartData.price;
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
    return this.http.put<any>('http://localhost:3000/api/updateproducts', product)
    .pipe(map(data => {
      return data;
    }))
  }

  getCounter(){
    return this.counter;
  }

  getsumPrice(){
    return this.sumPrice;
  }

}
