import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import {
  Quiz
} from 'src/app/Class/quiz';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  @Input() answers: string;
  @Input() quizTaken: Quiz;

  Score:number = 0;
  constructor() {}

  ngOnInit(): void {
    this.calculateScore();
  }

  calculateScore()
  {
    let answers = this.quizTaken.Answers;
  
    for(let i = 0; i < answers.length; i++)
    {
      if(answers[i] == this.answers[i])
      {
        this.Score++;
      }
    }
  }
  getAnswerFromLetter(questionNum: number, letter: string) {
    let quest = this.quizTaken.Questions[questionNum];
    switch (letter) {
      case 'a':
        return quest.PossibleAnswers[0];
        break;
      case 'b': return quest.PossibleAnswers[1];
        break;
      case 'c': return quest.PossibleAnswers[2];
        break;
      default: return quest.PossibleAnswers[3];
        break;
    }


  }

}
