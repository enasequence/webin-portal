import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ContactDialogModalComponent } from '../contact-dialog-modal/contact-dialog-modal.component';
import { ReportType } from '../report-type.enum';
import { SubmissionResultDialogComponent } from '../submission-result-dialog/submission-result-dialog.component';
import { UtilService } from '../util/Util-services';
import { XmlService } from '../util/xml.service';

@Component({
  selector: 'app-dac-management',
  templateUrl: './dac-management.component.html',
  styleUrls: ['./dac-management.component.css']
})
export class DacManagementComponent implements OnInit {

  ReportType = ReportType;
  editMode = false;
  /* Used for storing added emails, this will be used for validation */
  emails = [];
  contactArray = [];
  action: string;
  dataSource: MatTableDataSource<any>;
  id: string;
  showLoadingFlag: boolean;
  xmlString: string;
  title: string;
  displayedColumns: string[] = [
    "emailAddress",
    "name",
    //"telephone",
    "organization",
    "edit",
    "remove",
  ];


  constructor(
    public dialog: MatDialog,
    private util: UtilService,
    private xmlUtil: XmlService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    if (this.id) {
      this.action = "Edit";
      this.initEdit(this.id);
    }
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
    this.contactArray.splice(index, 1);
  }

  submitDac(form) {
    var observable: Observable<string>;
    let redirectPath = ""
    if (this.action != "Edit") {
      observable = this.xmlUtil.generateDacXml(
        form.value,
        this.contactArray,
      );

    } else {
      observable = this.xmlUtil.updateDacXml(
        this.xmlString,
        form.value,
        this.contactArray,
      );
      redirectPath = null;
    }

    this.util.showSubmissionResponse(
      this,
      SubmissionResultDialogComponent,
      observable,
      redirectPath
    );
  }

  initEdit(id) {
    this.showLoading();
    this.util.getDacXml(id).subscribe((xmlString: any) => {
      this.xmlString = xmlString;
      this.setPageValuesfromXml();
      this.hideLoading();
    });
  }
  setPageValuesfromXml() {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(this.xmlString, "text/xml");

    this.title = xmlDoc.getElementsByTagName("TITLE")[0].childNodes[0].nodeValue;
    this.setContactDetails(xmlDoc);

  }

  setContactDetails(xmlDoc) {
    var contacts = xmlDoc.getElementsByTagName("CONTACT");
    var contactLen = contacts.length;
    for (var i = 0; i < contactLen; i++) {
      var email = contacts[i].getAttribute("email");
      var name = contacts[i].getAttribute("name") || "";
      var organisation = contacts[i].getAttribute("organisation") || "";
      var telephone = contacts[i].getAttribute("telephone") || "";
      this.contactArray.push({
        id: this.util.getId(),
        emailAddress: email,
        name: name,
        organization: organisation,
        telephone: telephone

      });
    }
    this.updateEmailsArray();
    if (contacts.length > 0) {
      this.dataSource = new MatTableDataSource<any>(this.contactArray);
    }
  }

  showLoading() {
    this.showLoadingFlag = true;
  }

  hideLoading() {
    this.showLoadingFlag = false;
  }


}
