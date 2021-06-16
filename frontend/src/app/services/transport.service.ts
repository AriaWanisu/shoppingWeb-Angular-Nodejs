import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class TransportService {

  transport: any;

  constructor(private http: HttpClient) { }

  getTransport(){
    return this.http.get<any>('http://localhost:3000/api/transport')
      .pipe(map(data => {
        if(data) {
          this.transport = data;
          console.log(this.transport);
        }
        return this.transport;
      }))
  }
}
