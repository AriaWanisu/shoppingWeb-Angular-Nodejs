import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LocalStorageService } from 'angular-web-storage';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  fav: any;

  constructor(private http: HttpClient, public local: LocalStorageService) { }

  add2Fav(uid: String,Data: any){
    console.log("add cart Work")
    return this.http.post<any>('http://localhost:3000/api/favorite/'+uid, Data)
     .pipe(map(data => {
       if(data){

       }
       return data;
     }));
  }

  getFav(id: any){
    const url = 'http://localhost:3000/api/favorite/'

    console.log(url+id);

    return this.http.get<any>(url+id)
      .pipe(map(data => {
        if(data){
          this.fav = data
        }
        return data;
      }));
  }

  deleteCart(id: any,){
    const url = 'http://localhost:3000/api/favorite/'

    console.log("delete Work!")

    return this.http.delete<any>(url+id)
      .pipe(map(data => {
        if(data){
        }
      }));
  }


}
