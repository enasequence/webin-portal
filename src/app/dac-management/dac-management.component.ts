import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { ContactDialogModalComponent } from '../contact-dialog-modal/contact-dialog-modal.component';

@Component({
  selector: 'app-dac-management',
  templateUrl: './dac-management.component.html',
  styleUrls: ['./dac-management.component.css']
})
export class DacManagementComponent implements OnInit {

  editMode = false;
  /* Used for storing added emails, this will be used for validation */
  emails = [];
  contactArray = [];
  deletedContacts = [];
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [
    "emailAddress",
    "name",
    "telephone",
    "organization",
    "edit",
    "remove",
  ];


  constructor(public dialog: MatDialog,) { }

  ngOnInit() {
  }

  openDialog(action, obj): void {
    const dialogRef = this.dialog.open(ContactDialogModalComponent, {
      width: "500px",
      backdropClass: "custom-dialog-backdrop-class",
      panelClass: "custom-dialog-panel-class",
      data: { action: action, emailList: this.emails, contactObj: obj, isDac: true },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event != "close") {
        let contactObj = result.data;
        if (result.event === "Add") {
          this.addContactRow(contactObj);
          if (this.editMode) {
            //  this.newContacts.push(contactObj);
          }
        }
        if (result.event === "Update") {
          this.updateContactRow(contactObj);
        }
        if (result.event === "Delete") {
          this.deleteContactRow(contactObj);
        }

        if (result.event === "CloseSuccess") {
          if (!this.editMode) {
            //   this._router.navigateByUrl("");
          } else {
            //   this._router.navigateByUrl("/accountInfo");
          }
        }

        if (typeof contactObj != "undefined") {
          this.dataSource = new MatTableDataSource<any>(this.contactArray);
        }

        this.updateEmailsArray();
      }
    });
  }

  addContactRow(contact) {
    this.contactArray.push(contact);
  }

  updateContactRow(contact) {
    var index = this.contactArray
      .map(function (item) {
        return item.id;
      })
      .indexOf(contact.id);
    this.contactArray[index].emailAddress = contact.emailAddress;
    this.contactArray[index].name = contact.name;
    this.contactArray[index].telephone = contact.telephone;
    this.contactArray[index].organization = contact.organization;
  }

  updateEmailsArray() {
    this.emails = [];
    for (var i in this.contactArray) {
      this.emails.push(this.contactArray[i].emailAddress);
    }
  }

  deleteContactRow(contact) {
    var index = this.contactArray
      .map(function (item) {
        return item.id;
      })
      .indexOf(contact.id);
    this.deletedContacts.push(this.contactArray[index]);
    this.contactArray.splice(index, 1);
  }
}
