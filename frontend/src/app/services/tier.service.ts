import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class TierService {

  tier: any;

  constructor(private http: HttpClient) { }

  getTier(tier: any){
    return this.http.get<any>('http://localhost:3000/api/tier/'+tier)
      .pipe(map(data => {
        if(data){
          console.log(data);
       }
        return data;
      }))
  }
}
