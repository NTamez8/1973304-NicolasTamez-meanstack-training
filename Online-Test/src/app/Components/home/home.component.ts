import { Component, OnInit } from '@angular/core';
import { Quiz } from 'src/app/Class/quiz';
import { QuizService } from 'src/app/Services/quiz.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Quizzes:Quiz[] = [];

  constructor(private QService:QuizService) { }

  ngOnInit(): void {
    this.QService.GetAllQuizzes().subscribe(data=>{
      this.Quizzes = data;
    })

  }

}
