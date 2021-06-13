import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: string

  constructor(private http: HttpClient) { }

  getUser(token: any,id: any){

    const headers = {'Authorization': token}
    const url = 'http://localhost:3000/api/user/';

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

  addAddress(token: any,id: any,address: any){

    const headers = {'Authorization': token}
    const url = 'http://localhost:3000/user/address/';

    return this.http.put<any>(url+id, address)
      .pipe(map(data => {
        if(data){
          if(data.status == true){
            console.log(data);
          }
        }
        return data;
      }))

  }

  updateUser(id: any,userdata: any){

    const url = 'http://localhost:3000/api/user/';

    return this.http.put<any>(url+id, userdata)
      .pipe(map(data => {
        if(data){
          if(data.status == true){
            console.log(data);
          }
        }
        return data;
      }))
  }

}
