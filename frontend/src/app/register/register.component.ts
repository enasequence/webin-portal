/*
 * Copyright 2018 EMBL - European Bioinformatics Institute
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {ContactDialogModalComponent} from '../contact-dialog-modal/contact-dialog-modal.component';
import { MatTableDataSource } from '@angular/material';
import {UtilService} from '../util/Util-services'
import { getLocaleDayNames } from '@angular/common';
import { mergeMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent {

  contactArray= [];
  primaryContact: number;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['firstName', 'email','primaryContact','edit','remove'];

  /* Used for storing dssed emails, this will be used for validation */
  emails= [];

  countries=<any>[];

  constructor(public dialog: MatDialog,private util: UtilService) {
    this.primaryContact=0;
   }

  ngOnInit() {
    this.util.getCountries(null);
   }

  ngOnDestroy() {
  }

  openDialog(action,obj): void {
    const dialogRef = this.dialog.open(ContactDialogModalComponent, {
      width: '500px',
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      data: {action: action, emailList:this.emails,contactObj:obj}
    });

    dialogRef.afterClosed().subscribe(result => {

      if(result.event!='close'){

        let contactObj=result.data;
        if(result.event==='Add'){
          this.addContactRow(contactObj);
        }
        if(result.event==='Update'){
          this.updateContactRow(contactObj);
        }
        if(result.event==='Delete'){
          this.deleteContactRow(contactObj);
        }

        this.updatePrimaryContact(contactObj)
        this.dataSource = new MatTableDataSource<any>(this.contactArray);

        this.updateEmailsArray();
      }
    });  
  }

  
addContactRow(contact){

  contact=this.updateRequestFields(contact);
  this.contactArray.push(contact);
}

updateContactRow(contact){
  
  var index = this.contactArray.map(function(item) { return item.id; }).indexOf(contact.id);
  this.contactArray[index].email=contact.email;
  this.contactArray[index].firstName=contact.firstName;
  this.contactArray[index].middleName=contact.middleName;
  this.contactArray[index].surname=contact.surname;
  this.contactArray[index].consortiumName=contact.consortiumName;
  this.contactArray[index].primaryContact=contact.primaryContact;
  this.contactArray[index].consortiumContact=contact.consortiumContact;  
  this.contactArray[index].name=contact.name;
  this.contactArray[index].consortium=contact["consortiumName"];
  this.contactArray[index].mainContact=contact["primaryContact"];
  this.contactArray[index].emailAddress=contact["email"];
  
}

updateRequestFields(contact){
  contact["consortium"]=contact["consortiumName"];
  contact["mainContact"]=contact["primaryContact"];
  contact["emailAddress"]=contact["email"];
  
  return contact;
}

deleteContactRow(contact){
  var index = this.contactArray.map(function(item) { return item.id; }).indexOf(contact.id);
  this.contactArray.splice(index, 1);
}

updatePrimaryContact(contactObj){
  if(contactObj.primaryContact){
    for(var i in this.contactArray){
      if(this.contactArray[i].id!=contactObj.id){
        this.contactArray[i].primaryContact=false;
      }
    }
    this.primaryContact=1;
  }
}

updatePrimaryContactCount()
  {
    this.primaryContact=0;
    for(var i in this.contactArray)
    {
      if(this.contactArray[i].primaryContact)
      this.primaryContact++;
    }
  }


updateEmailsArray(){
  this.emails=[];
  for(var i in this.contactArray) {
    this.emails.push(this.contactArray[i].email)
  }
}

async submitAccount(form){
 var submissionAccount=form.value;
 submissionAccount["submissionContacts"]=this.contactArray;

 (await this.util.saveSubmissionAccount(submissionAccount)).
 subscribe((data:any) => { 
    this.openDialog('Success',data);
  },(error) => {
    this.openDialog('Error',error); 
  });
}

doFilterCountry(prefix){
  this.countries=this.util.getCountries(prefix);
}
}
