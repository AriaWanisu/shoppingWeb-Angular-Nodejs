import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularWebStorageModule } from 'angular-web-storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { RecommendedComponent } from './components/recommended/recommended.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { UserComponent } from './components/user/user.component';
import { AddressComponent } from './components/address/address.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { PasswordComponent } from './components/password/password.component';
import { CodeComponent } from './components/code/code.component';


@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    RecommendedComponent,
    HomeComponent,
    HeaderComponent,
    UserComponent,
    AddressComponent,
    UserMenuComponent,
    PasswordComponent,
    CodeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AngularWebStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
