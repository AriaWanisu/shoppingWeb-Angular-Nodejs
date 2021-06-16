import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  product: any;
  item: any;
  price: number;

  constructor(private http: HttpClient) { }

  getProducts(){
    return this.http.get<any>('http://localhost:3000/api/products')
      .pipe(map(data => {
        if(data) {
          this.product = data;
          console.log(this.product);
        }
        return this.product;
      }))
  }

  getSomeProduct(pid: any){

    const url = 'http://localhost:3000/api/products/'

    console.log(url+pid)

    return this.http.get<any>(url+pid,)
    .pipe(map(data =>{
      if(data){
        console.log(data);
        this.product = data;
      }
      return data;
    }));
  }

  
  getProductPrice(pid: any){

    const url = 'http://localhost:3000/api/products/'

    return this.http.get<any>(url + pid,)
     .pipe(map(data => {
       if(data){
         this.price = data.price;
       }
       return this.price;
     }));
  }
}
