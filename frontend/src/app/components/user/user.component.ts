import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { LocalStorageService } from 'angular-web-storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  token: string;
  id: string;
  user: any;

  constructor( public local: LocalStorageService,private ms: MemberService,private router: Router) {
    try {
      this.token = this.local.get('user').token;
      this.id = this.local.get('user').result.username;
      this.ms.getUser(this.token, this.id).subscribe(
        (data) => {
          this.user = data;
        },
        (err) => {
          this.router.navigate(['/']);
        }
      );
    } catch (error) {
      console.log(error);
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {}
}
