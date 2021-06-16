import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.css']
})
export class RecommendedComponent implements OnInit {

  product: any;
  uid: any;
  item: any;

  constructor(private ps: ProductService, private cs: CartService,public local: LocalStorageService) { 
    this.getProduct();
  }

  ngOnInit(): void {
  }

  getProduct(){
    console.log('work')
    try{
      this.ps.getProducts().subscribe(
        data => {
          this.product = data;
          console.log(this.product)
        },
        err => {
          console.log(err)
        });
    }catch(error){
      console.log(error)
    }
  }

  getSomeProduct(pid: string){
    this.uid = this.local.get('user').result.id;
    this.ps.getSomeProduct(pid).subscribe(
      (data) => {
        this.item = data;
        console.log("getSomeProduct Work")
        this.cs.add(this.uid , this.item).subscribe(
          data => {
            alert('เพิ่มสินค้าสำเร็จ')
          },
          err => {
            console.log(err);
            alert('เพิ่มสินค้าสำเร็จไม่สำเร็จ!');
          });
      },
      (err) => {

      }
    )
  }


}
