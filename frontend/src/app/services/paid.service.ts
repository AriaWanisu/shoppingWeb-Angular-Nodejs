import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { LocalStorageService } from 'angular-web-storage'

@Injectable({
  providedIn: 'root'
})
export class PaidService {

  constructor(private http: HttpClient, public local: LocalStorageService) { }

  paid(user: any){
    const body = "paid"
    return this.http.put<any>('http://localhost:3000/api/paid/'+ user._id,body)
  }

  upgradeUser(data: any){
    console.log("UpgredeUser Work")
    
    
    const uid = data._id
    const playload = {
      point: this.local.get('sumPrice'),
      tier: data.tier
    }
    console.log(uid);
    console.log(playload);
    
    return this.http.put<any>('http://localhost:3000/api/upgade/'+uid,playload)
    .pipe(map(data=>{
      console.log(data);
    }))
  }
}
