import { Component, OnInit } from '@angular/core';
import { UtilService } from '../util/Util-services'
import { XmlService } from '../util/xml.service'

import { MatTableDataSource, MAT_DATE_LOCALE } from '@angular/material';
import { Observable } from 'rxjs'
import { retry } from 'rxjs/operators';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import * as _moment from 'moment';
import { ActivatedRoute } from '@angular/router';
  
  const moment =  _moment;
  export const CUSTOM_FORMATS = {
    parse: {
      dateInput: 'LL',
    },
    display: {
      dateInput: 'DD-MM-YYYY',
      monthYearLabel: 'YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'YYYY',
    },
  };




@Component({
  selector: 'app-study-management',
  templateUrl: './study-management.component.html',
  styleUrls: ['./study-management.component.css'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: CUSTOM_FORMATS},
  ]
})
export class StudyManagementComponent implements OnInit {

  /*Page fields*/
  releaseDate:any;
  studyName: string;
  studyTitle: string;
  description:string;
  releaseStatus: string;
  xmlString: string;

  pubMedArray: [];
  selectedPubMedArray= [];
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'title','remove'];
  showPubMedSearch = false;
  pubMedSearch="";
  today=new Date();
  maxDate: any;
  id: any;
  action: string;
  
  constructor(private util: UtilService,private xmlUtil: XmlService,private activatedRoute: ActivatedRoute,) { 
    var date=new Date();
    this.maxDate = new Date(date.getFullYear() + 2, date.getMonth(),date.getDate());
    
  }

  ngOnInit() {
    this.id=this.activatedRoute.snapshot.params.id;
    if(this.id){
      this.action="Edit";
      this.initEdit(this.id);
    }
    
  }

  async getPubMed(searchVal){
    (await this.util.getPubMed(searchVal)).
      subscribe((data:any) => {
          this.pubMedArray=data.resultList.result;
  });
  }

  async showExistingPubMed(id){
    (await this.util.getPubMedById(id)).
      subscribe((data:any) => {
        if(data.resultList.result.length>0){
          this.selectedPubMedArray.push(data.resultList.result[0]);
          this.dataSource = new MatTableDataSource<any>(this.selectedPubMedArray);
        }else{
          console.log("Invalid PubMed Id :'"+id+"' is ignored.")
        }
    });
  }

  getPubMedDisplayText(option){
    if(option){
    return option.id + " [ "+option.title+" ]";
    }
  }

  selectedPubMed(event) {
    this.selectedPubMedArray.push(event.option.value);
    this.dataSource = new MatTableDataSource<any>(this.selectedPubMedArray);
    this.pubMedSearch="";
    this.showPubMedSearch=false;
  }

  addPubMed(){
    this.showPubMedSearch=true;
  }

  removePubMed(pubMedObj){
    var index = this.selectedPubMedArray.map(function(item) { return item.id; }).indexOf(pubMedObj.id);
    this.selectedPubMedArray.splice(index, 1);
    this.dataSource = new MatTableDataSource<any>(this.selectedPubMedArray);
  }

  submitStudy(form){
    if(this.action!="Edit"){
      this.xmlUtil.generateStudyXml(form.value,this.selectedPubMedArray);
    }else{
      this.xmlUtil.updateProjectXml(this.xmlString,form.value,this.selectedPubMedArray);
    }
  }

  async initEdit(id){
    (await this.util.getProjectDetails(id)).
    subscribe((data:any) => {
      this.setPageValuesfromReport(data[0].report);
    });

    (await this.util.getProjectXml(id)).
    subscribe((xmlString:any) => {
      this.xmlString=xmlString;
      this.setPageValuesfromXml();
    });
  }

  setPageValuesfromReport(data){
    this.releaseDate=new Date(data["holdDate"]);
    this.releaseStatus=data["releaseStatus"];
  }

  setPageValuesfromXml(){
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(this.xmlString, "text/xml");
    var nameTag=xmlDoc.getElementsByTagName("NAME")[0];
    var titleTag=xmlDoc.getElementsByTagName("TITLE")[0];
    var descriptionTag=xmlDoc.getElementsByTagName("DESCRIPTION")[0];
    this.studyName=nameTag.hasChildNodes() ? nameTag.childNodes[0].nodeValue : "";
    this.studyTitle=titleTag.hasChildNodes() ? titleTag.childNodes[0].nodeValue : "";
    this.description=descriptionTag.hasChildNodes() ? descriptionTag.childNodes[0].nodeValue : "";
    
    this.setPubMedDetails(xmlDoc);
  }
  
  setPubMedDetails(xmlDoc){
    var projectLinks=xmlDoc.getElementsByTagName("PROJECT_LINKS").childNodes;
    projectLinks = xmlDoc.getElementsByTagName("PROJECT_LINKS")[0];
    if(projectLinks){
      var xRefLink=projectLinks.getElementsByTagName("XREF_LINK");
      length=xRefLink.length
      for(var i=0;i<length;i++){
        var dbTagValue=xRefLink[i].getElementsByTagName("DB")[0].childNodes[0].nodeValue; 
        if(dbTagValue==="PUBMED"){
          var pupMedId=xRefLink[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue; 
          this.showExistingPubMed(pupMedId);
        }
      }
    }
  }
  
 
}
