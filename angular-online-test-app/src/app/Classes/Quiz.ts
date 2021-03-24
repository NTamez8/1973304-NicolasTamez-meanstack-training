import { QuizQuestion } from "./QuizQuestion";

export class Quiz{
    currentQuestion:number = -1;


    constructor(public ID:number, public ShortDesc:string, public QuizQuestions:QuizQuestion[],private Answers:string){}

    getNextQuestion()
    {
        this.currentQuestion++;
        return this.QuizQuestions[this.currentQuestion];
    }
    getAnswers()
    {
        return this.Answers;
    }


}