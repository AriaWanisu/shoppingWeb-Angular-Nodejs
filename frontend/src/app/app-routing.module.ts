import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component"
import { UserComponent } from './components/user/user.component'
import { AddressComponent } from './components/address/address.component'
import { PasswordComponent } from './components/password/password.component'
import { CodeComponent } from './components/code/code.component'
import { CartComponent } from './components/cart/cart.component'
import { FavoriteComponent } from './components/favorite/favorite.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'user', component: UserComponent},
  {path: 'user/address', component: AddressComponent},
  {path: 'user/password', component: PasswordComponent},
  {path: 'user/code', component: CodeComponent},
  {path: 'cart', component: CartComponent},
  {path: 'favorite', component: FavoriteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
