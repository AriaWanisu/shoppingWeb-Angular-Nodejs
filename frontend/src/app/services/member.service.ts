import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  user: string

  constructor(private http: HttpClient) { }

  getUser(token: any,id: any){

    const headers = {'Authorization': token}
    const url = 'http://localhost:3000/api/customer/';

    console.log(id)
    
    return this.http.get<any>(url+id, {headers})
    .pipe(map(data =>{
      if(data){
        console.log(data);
        this.user = data;
      }
      return data;
    }));
  }
}
