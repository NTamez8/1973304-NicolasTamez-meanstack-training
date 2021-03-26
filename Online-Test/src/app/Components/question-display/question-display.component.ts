import { Component, Input, OnInit } from '@angular/core';
import { QuizQuestion } from 'src/app/Class/quiz-question';

@Component({
  selector: 'app-question-display',
  templateUrl: './question-display.component.html',
  styleUrls: ['./question-display.component.css']
})
export class QuestionDisplayComponent implements OnInit {
  @Input() question:QuizQuestion

  constructor() { }

  ngOnInit(): void {
  }

}
