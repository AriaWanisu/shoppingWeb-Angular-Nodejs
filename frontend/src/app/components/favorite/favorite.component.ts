import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../../services/favorite.service';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  fav: any;

  constructor(public local: LocalStorageService, private fs: FavoriteService) {
    this.getFav();
   }

  ngOnInit(): void {
  }

  getFav(){
    const uid = this.local.get('user').result.id
    this.fav = this.fs.getFav(uid).subscribe(
      (data) => {
        this.fav = data;
        console.log(this.fav);
      },
      (err) => {
        
      }
    );
  }

  delete(cid: string,){
    this.fs.deleteCart(cid).subscribe(
      (result) => {
        alert("ลบออกจากรายการโปรด")
        window.location.reload()
      },
      (err) => {
           
      }
    );
  }

}
