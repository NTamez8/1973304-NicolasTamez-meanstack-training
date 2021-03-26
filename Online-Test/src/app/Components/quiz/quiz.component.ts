import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from 'src/app/Class/quiz';
import { QuizQuestion } from 'src/app/Class/quiz-question';
import { QuizService } from 'src/app/Services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
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
