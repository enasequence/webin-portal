import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {UtilService} from '../util/Util-services'


@Component({
  selector: 'app-contact-dialog-modal',
  templateUrl: './contact-dialog-modal.component.html',
  styleUrls: ['./contact-dialog-modal.component.css']
})
export class ContactDialogModalComponent implements OnInit {

 

  /* Used for storing dssed emails, this will be used for validation */
  emails= [];

  /* Add / Update / Delete */
  action: string;

  contactObj={};
  
  constructor( private formBuilder: FormBuilder, 
              public dialogRef: MatDialogRef<ContactDialogModalComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
              private util: UtilService) { 
      this.action = data.action;
      this.emails=data.emailList;
      if(this.action!="Error"){
        this.copyObjectValue(data.contactObj,this.contactObj)
      }else{
        this.contactObj=data.contactObj;
      }
      
    }

  ngOnInit() { 
  }

  doAction(){
    if(this.action==="Add") {
      this.contactObj["id"]=this.util.getId();
    }
    let contact=this.updateName(this.contactObj);
    this.dialogRef.close({ event: this.action, data: contact });
  }

  closePopup(){
    this.dialogRef.close({event: 'close'});
  }

  updateName(contact){
    var name= contact["firstName"] + " " + (contact["middleInitials"] || "") + " "+ contact["surname"];
    if(contact["consortiumContact"]){
      name=contact["consortium"];
      contact.firstName="";
      contact.surname="";
      contact.middleInitials="";
    }else{
      contact.consortium="";
    }

    contact["name"]=name;
    return contact;
  }

  copyObjectValue(from,to){
    to.id=from.id;
    to.emailAddress=from.emailAddress;
    to.firstName=from.firstName;
    to.middleInitials=from.middleInitials;
    to.surname=from.surname;
    to.consortium=from.consortium;
    to.mainContact=from.mainContact;
    to.consortiumContact=from.consortiumContact;
    to.name=from.name;
    to.submissionAccountId=from.submissionAccountId;
  }

  
}
