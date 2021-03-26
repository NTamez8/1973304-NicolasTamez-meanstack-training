import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { QuizComponent } from './Components/quiz/quiz.component';
import { QuizLeaveGuard } from './Guards/quiz-leave.guard';


const routes: Routes = [
{path:'Home',component:HomeComponent},
{path:'Quiz/:id',component:QuizComponent, canDeactivate:[QuizLeaveGuard]},
{path:'',redirectTo:'Home',pathMatch:'full'},
{path:'**',redirectTo:'Home',pathMatch:'full'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
