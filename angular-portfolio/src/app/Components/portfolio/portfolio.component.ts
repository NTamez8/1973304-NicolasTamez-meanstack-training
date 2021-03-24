import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Contact } from 'src/app/Classes/Conctact';
import { User } from 'src/app/Classes/User';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  CUser:User;
  Contacts:Contact[] = [];
ContactFormGroup = new FormGroup(
  {
    CName : new FormControl(),
    CPhone : new FormControl()
  }
)
  
  constructor(private UService:UserService) { 
    this.CUser = UService.CurrentUser;
    this.Contacts = this.CUser.Contacts;
    
  }

  ngOnInit(): void {
    
  }

  AddContact()
  {
    let name = this.ContactFormGroup.controls['CName'].value;
    let phone = this.ContactFormGroup.controls['CPhone'].value;

    if(name != '' && phone != '')
   { 
     
    this.Contacts.push(new Contact(name,phone));
    this.UService.UpdateUser(this.CUser.UName,this.CUser.Password,this.Contacts);
  }
  }

}
