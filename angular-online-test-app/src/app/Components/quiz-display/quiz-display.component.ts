import { Component, OnInit } from '@angular/core';
import { Quiz } from 'src/app/Classes/Quiz';
import { QuizServiceService } from 'src/app/Services/quiz-service.service';

@Component({
  selector: 'app-quiz-display',
  templateUrl: './quiz-display.component.html',
  styleUrls: ['./quiz-display.component.css']
})
export class QuizDisplayComponent implements OnInit {

  QuizzesAny$: any;
  MyQ:Quiz[] = [];


  constructor(private QS: QuizServiceService) { }

  ngOnInit(): void {
    this.QS.getQuizzes().subscribe((x:string) => {
       this.MyQ = JSON.parse(x);
      
    
    });
    
    
    
  }

}
