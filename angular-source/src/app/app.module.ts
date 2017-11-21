import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FlashMessagesModule } from 'angular2-flash-messages';

//services
import { ProductService } from './shared/product.service';
import { AuthService } from './shared/auth.service';
import { ValidateService } from './shared/validate.service';
import {AuthGuard} from '../guards/auth.guard';
//components 
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';

// adding routes
const routes: Routes = [
  { path: '', redirectTo: 'app', pathMatch: 'full' },
  { path: 'app', component: AppComponent, canActivate:[AuthGuard]},
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent , canActivate:[AuthGuard]}
  //   { path: 'product/:id', component: ProductDetailComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    CartComponent,
    RegisterComponent,
    ProfileComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FlashMessagesModule
  ],
  providers: [
    ProductService,
    AuthService,
    ValidateService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
