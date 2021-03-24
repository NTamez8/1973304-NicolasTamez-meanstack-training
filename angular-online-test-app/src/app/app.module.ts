import {HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizModule } from './Modules/quiz/quiz.module';
import { QuizServiceService } from './Services/quiz-service.service';


@NgModule({
  declarations: [
    AppComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QuizModule,
    HttpClientModule
  ],
  providers: [QuizServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
