import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
    DialogAccessComponent
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
    JwtModule.forRoot({
      config: {
        tokenGetter : tokenGetter,
        whitelistedDomains: ['localhost:8082'],
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }