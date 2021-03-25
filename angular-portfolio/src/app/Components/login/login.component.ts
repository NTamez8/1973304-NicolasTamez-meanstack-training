import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Classes/User';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Login = new FormGroup(
    {
      UserName : new FormControl(),
      Password: new FormControl()
    }
  )

  constructor(private router:Router,private UService:UserService) { 
    UService.CurrentUser = null;
  }

  ngOnInit(): void {
  }

  submitForm()
  {
    /*
    let temp = sessionStorage.getItem('Key') || '';
    let TempUser:User = JSON.parse(temp);
    if(TempUser != null)
    {
      let uname = TempUser.UName;
      let password = TempUser.Password;
      let LoginUName = this.Login.controls['UserName'].value;
      let LoginPassword = this.Login.controls['Password'].value;

      if(LoginUName == uname && LoginPassword == password)
      {
        this.UService.CurrentUser = new User(TempUser.FName,TempUser.LName,uname,password);
        this.router.navigate(['portfolio']);
      }
      else
      {
        this.Login.controls['UserName'].setValue('');
      this.Login.controls['Password'].setValue('');
      }
    }*/
    let LoginUName = this.Login.controls['UserName'].value;
    let LoginPassword = this.Login.controls['Password'].value;
    if(this.UService.ValidateUser(LoginUName,LoginPassword))
    {
      this.UService.SetUser(LoginUName,LoginPassword);
      this.router.navigate(['portfolio']);
    }

  }

}
