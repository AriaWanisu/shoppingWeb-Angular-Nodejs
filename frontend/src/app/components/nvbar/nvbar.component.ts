import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { LocalStorageService } from 'angular-web-storage'

@Component({
  selector: 'app-nvbar',
  templateUrl: './nvbar.component.html',
  styleUrls: ['./nvbar.component.css']
})
export class NvbarComponent implements OnInit {

  constructor(public local: LocalStorageService,private router: Router) { }

  ngOnInit(): void {
  }

  signout(){
    this.local.clear();
    this.router.navigate(['/login']);
  }

}
