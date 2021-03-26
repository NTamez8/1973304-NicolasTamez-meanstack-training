import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Quiz } from 'src/app/Class/quiz';
import { QuizQuestion } from 'src/app/Class/quiz-question';
import { canComponentDeactivate } from 'src/app/Guards/quiz-leave.guard';
import { QuizService } from 'src/app/Services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit,canComponentDeactivate {
QuizForm = new FormGroup({
  Answer: new FormControl()
});
 values:string[] = ["A","B","C","D"];
  myQuiz:Quiz;
  currentQuestion:QuizQuestion;
  currentQuestionIndex:number = 0;
  myAnswers:string = '';
 isTakingQuiz:boolean = true;

  constructor(private _ActiveRoute:ActivatedRoute,private Qservice:QuizService) { }
  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    
    if(!this.isTakingQuiz)
    return true;
    else
    {
      return confirm('Are you sure you want to leave the quiz?');
    }
    
  }
  

  ngOnInit(): void {
    let temp = this._ActiveRoute.snapshot.paramMap.get('id');
   let Qid = parseInt(temp);
   this.Qservice.GetAllQuizzes().subscribe(data=>{
    data.forEach(x=>{
      if(x.ID == Qid)
        {
          this.myQuiz = x;
          this.currentQuestion = this.myQuiz.Questions[0];
        }
    })
  })
  }

  Change(){
    this.currentQuestionIndex++;
    this.currentQuestion = this.myQuiz.Questions[this.currentQuestionIndex];
    
    this.myAnswers += this.QuizForm.controls['Answer'].value;
    
    this.QuizForm.controls['Answer'].setValue('');
  }

  submitTest()
  {
    this.isTakingQuiz = false;
    this.myAnswers += this.QuizForm.controls['Answer'].value;
    this.myAnswers = this.myAnswers.toLowerCase();
  }

}
