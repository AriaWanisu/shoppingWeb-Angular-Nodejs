import { Component, OnInit } from '@angular/core';
import { CodeService} from '../../services/code.service';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit {
  
  code: any;

  constructor(private cs: CodeService) { 
    this.codelist();
  }

  ngOnInit(): void {
  }

  codelist(){
    console.log('work')
    try{
      this.cs.getCode().subscribe(
        data => {
          this.code = data;
          console.log(this.code)
        },
        err => {
          console.log(err)
        });
    }catch(error){
      console.log(error)
    }
  }

}
