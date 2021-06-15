import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component"
import { UserComponent } from './components/user/user.component'
import { AddressComponent } from './components/address/address.component'
import { PasswordComponent } from './components/password/password.component'
import { CodeComponent } from './components/code/code.component'

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'user', component: UserComponent},
  {path: 'user/address', component: AddressComponent},
  {path: 'user/password', component: PasswordComponent},
  {path: 'user/code', component: CodeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
