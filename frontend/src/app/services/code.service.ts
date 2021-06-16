import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  code: any;

  constructor(private http: HttpClient) { }

  getCode(){
    return this.http.get<any>('http://localhost:3000/api/code')
      .pipe(map(data => {
        if(data) {
          this.code = data;
          console.log(this.code);
        }
        return this.code;
      }))
  }

  useCode(code: string){
    return this.http.get<any>('http://localhost:3000/api/code/'+code)
      .pipe(map(data => {
        if(data){
          console.log(data);
        }
        return data;
      }))
  }
}
