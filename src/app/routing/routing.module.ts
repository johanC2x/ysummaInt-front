import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { SignInComponent } from '../sign-in/sign-in.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { AccessComponent } from '../access/access.component';
import { RecoverComponent } from '../recover/recover.component';
import { SendComponent } from '../send/send.component';
import { PagenotfoundComponent } from '../pagenotfound/pagenotfound.component';
import { ProfileComponent } from '../profile/profile.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent},
  { path: 'sign-up', component: SignUpComponent},
  { path: 'create-app', component: AccessComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'recover/:token', component: RecoverComponent},
  { path: 'send', component: SendComponent},
  {path: '404', component: PagenotfoundComponent},
  {path: '**', redirectTo: '/404'}
  //{ path: '**', pathMatch: 'full', component: PagenotfoundComponent },
];
 
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule { }
