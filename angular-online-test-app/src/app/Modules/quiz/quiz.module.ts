import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizDisplayComponent } from '../../Components/quiz-display/quiz-display.component';



@NgModule({
  declarations: [QuizDisplayComponent],
  imports: [
    CommonModule
  ],
  exports:[QuizDisplayComponent]
  
})
export class QuizModule { }
