import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { PortfolioComponent } from './Components/portfolio/portfolio.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { UserGuardGuard } from './Guards/user-guard.guard';

const routes: Routes = [
{path:'', component:LoginComponent},
{path:'portfolio',component:PortfolioComponent,canActivate:[UserGuardGuard]},
{path:'signUp',component:SignUpComponent},
{path:'**',redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
