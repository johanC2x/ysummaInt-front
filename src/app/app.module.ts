import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { RoutingModule } from './routing/routing.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AccessComponent } from './access/access.component';
import { MatTableModule } from '@angular/material/table';
import { DialogAccessComponent } from './access/dialog/dialog-access/dialog-access.component';
import { MatDialogModule } from '@angular/material/dialog';
import { JwtModule } from '@auth0/angular-jwt';
import { TOKEN_NAME } from './_shared/var.constants';
import { MatExpansionModule } from '@angular/material/expansion';
import { AlertComponent } from './_component/alert/alert.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { environment } from './../environments/environment';
import { NgxPayPalModule } from 'ngx-paypal';
import { NgxSpinnerModule } from "ngx-spinner";
import { CheckoutComponent } from './access/checkout/checkout.component';

export function tokenGetter() {
  let tk = JSON.parse(sessionStorage.getItem(TOKEN_NAME));
  let token = tk != null ? tk.access_token : '';
  //console.log(token);
  return token;
}

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,
    HeaderComponent,
    SidenavListComponent,
    SignInComponent,
    SignUpComponent,
    AccessComponent,
    DialogAccessComponent,
    AlertComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    RoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatDialogModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatGridListModule,
    NgxPayPalModule,
    NgxSpinnerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter : tokenGetter,
        whitelistedDomains: [environment.apiDomain],
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
