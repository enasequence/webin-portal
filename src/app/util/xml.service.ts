import { Injectable } from '@angular/core';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { WebinAuthenticationService } from '../webin-authentication.service';
import { WebinRestService } from '../webin-rest.service';
import { ReportType } from '../report-type.enum';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { UtilService } from '../util/Util-services';
import { v4 as uuid } from 'uuid';


@Injectable({
  providedIn: 'root'
})
export class XmlService {

  constructor(
    private _webinAuthenticationService: WebinAuthenticationService,
    private _webinRestService: WebinRestService,
    private util: UtilService) { }

  generateStudyXml(form, selectedPubMedArray, attributeArray, locusTagArray) {

    let pubMedXml = this.getPubMedXmlTags(selectedPubMedArray);
    let attributeXml = this.getAttributeXmlTags(attributeArray)
    let locusTagXml = this.getlocusTagXmlTags(locusTagArray);
    let alias = uuid();

    let projectXml = new Blob(['<?xml version = "1.0" encoding = "UTF-8"?>' +
      '<PROJECT_SET>' +
      '<PROJECT alias="' + alias + '">' +
      '<NAME>' + form.studyName + '</NAME>' +
      '<TITLE>' + form.studyTitle + '</TITLE>' +
      '<DESCRIPTION>' + form.description + '</DESCRIPTION>' +
      '<SUBMISSION_PROJECT>' +
      '<SEQUENCING_PROJECT>' +
      locusTagXml +
      '</SEQUENCING_PROJECT>' +
      '</SUBMISSION_PROJECT>' +
      pubMedXml +
      attributeXml +
      '</PROJECT>' +
      '</PROJECT_SET>'])
    var action = { name: "add" };
    let dateStr = this.getFormatedReleseDate(new Date(form.releaseDate));
    const observable: Observable<string> = this._webinRestService.updateXml(ReportType.projects, projectXml, 'Add', dateStr)
    return observable;
  }

  generateDacXml(form, contactArray) {

    let contactXml = this.getContactXmlTags(contactArray);
    let alias = uuid();

    let dacXml = new Blob(['<?xml version = "1.0" encoding = "UTF-8"?>' +
      '<DAC_SET>' +
      '<DAC alias="' + alias + '">' +
      '<TITLE>' + form.title + '</TITLE>' +
      contactXml +
      '</DAC>' +
      '</DAC_SET>'])
    var action = { name: "add" };
    //let dateStr = this.getFormatedReleseDate(new Date(form.releaseDate));
    const observable: Observable<string> = this._webinRestService.updateXml(ReportType.dacs, dacXml, 'Add')
    return observable;
  }


  getPubMedXmlTags(selectedPubMedArray) {
    let pubmedXml = "<PROJECT_LINKS>";
    selectedPubMedArray.forEach(element => {
      pubmedXml += '<PROJECT_LINK>' +
        '<XREF_LINK>' +
        '<DB>PUBMED</DB>' +
        '<ID>' + element.id + '</ID>' +
        '</XREF_LINK>' +
        '</PROJECT_LINK>';
    });
    pubmedXml += '</PROJECT_LINKS>';
    return pubmedXml;
  }

  getAttributeXmlTags(attributeArray) {
    let attributeXml = "<PROJECT_ATTRIBUTES>";
    attributeArray.forEach(element => {
      attributeXml += '<PROJECT_ATTRIBUTE>' +
        '<TAG>' + element.tag + '</TAG>' +
        '<VALUE>' + element.tagValue + '</VALUE>' +
        '</PROJECT_ATTRIBUTE>';
    });
    attributeXml += '</PROJECT_ATTRIBUTES>';
    return attributeXml;
  }

  getlocusTagXmlTags(locusTagArray) {
    let locusTagXml = "";
    locusTagArray.forEach(element => {
      locusTagXml += '<LOCUS_TAG_PREFIX>' +
        element.locusTag +
        '</LOCUS_TAG_PREFIX>';
    });

    return locusTagXml;
  }

  getContactXmlTags(contactArray) {
    let contactXml = "<CONTACTS>";
    contactArray.forEach(element => {
      //contactXml += '<CONTACT name="' + element.name + '" email="' + element.emailAddress + '" organisation="' + element.organization + '" telephone="' + element.telephone + '"/>';
      contactXml += '<CONTACT name="' + element.name + '" email="' + element.emailAddress + '" organisation="' + element.organization + '"/>';
    });
    contactXml += "</CONTACTS>"
    return contactXml;
  }



  updateProjectXml(orginalXml, form, pubMedArray, attributeArray, locusTagArray) {
    var pubMedXmlStr = this.getPubMedXmlTags(pubMedArray);
    var attributeXmlStr = this.getAttributeXmlTags(attributeArray);
    var locusTagXmlStr = '<LOCUS-TAGS>' + this.getlocusTagXmlTags(locusTagArray) + '</LOCUS-TAGS>';
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(orginalXml, "text/xml");
    var pubMedXml = parser.parseFromString(pubMedXmlStr, "text/xml");
    var attributeXml = parser.parseFromString(attributeXmlStr, "text/xml");
    var locusTagXml = parser.parseFromString(locusTagXmlStr, "text/xml");
    var nameTag = xmlDoc.getElementsByTagName("NAME")[0];
    var titleTag = xmlDoc.getElementsByTagName("TITLE")[0];
    var descriptionTag = xmlDoc.getElementsByTagName("DESCRIPTION")[0];

    /** Check if the tag is empty and set the values accordingly */
    if (nameTag) {
      nameTag.hasChildNodes() ? nameTag.childNodes[0].nodeValue = form.studyName : nameTag.appendChild(xmlDoc.createTextNode(form.studyName));
    }
    if (titleTag) {
      titleTag.hasChildNodes() ? titleTag.childNodes[0].nodeValue = form.studyTitle : titleTag.appendChild(xmlDoc.createTextNode(form.studyTitle));
    }
    if (descriptionTag) {
      descriptionTag.hasChildNodes() ? descriptionTag.childNodes[0].nodeValue = form.description : descriptionTag.appendChild(xmlDoc.createTextNode(form.description));
    }



    /** Update PubMed Ids */
    this.updateProjectLinks(xmlDoc, pubMedXml);

    /** Update project attributes */
    this.updateProjectAttributes(xmlDoc, attributeXml);

    /** Update Locas tag Xml */
    this.updateProjectLocasTags(xmlDoc, locusTagXml);

    var xmlDocStr = new XMLSerializer().serializeToString(xmlDoc.documentElement);
    //console.log(xmlDocStr);
    let dateStr = this.getFormatedReleseDate(new Date(form.releaseDate))

    var action = { name: "Edit", id: form.id };
    const observable: Observable<string> = this._webinRestService.updateXml(ReportType.projects, new Blob([xmlDocStr]), action, dateStr)
    //this.handleServerResponse(observable);
    return observable;
  }

  updateDacXml(orginalXml, form, contactArray) {
    var contactXmlStr = this.getContactXmlTags(contactArray);
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(orginalXml, "text/xml");
    var contactXml = parser.parseFromString(contactXmlStr, "text/xml");
    var titleTag = xmlDoc.getElementsByTagName("TITLE")[0];


    /** Check if the tag is empty and set the values accordingly */
    if (titleTag) {
      titleTag.hasChildNodes() ? titleTag.childNodes[0].nodeValue = form.title : titleTag.appendChild(xmlDoc.createTextNode(form.title));
    }

    /** Update project attributes */
    this.updateDacContacts(xmlDoc, contactXml);


    var xmlDocStr = new XMLSerializer().serializeToString(xmlDoc.documentElement);
    //console.log(xmlDocStr);
    let dateStr = this.getFormatedReleseDate(new Date(form.releaseDate))

    var action = { name: "Edit", id: form.id };
    const observable: Observable<string> = this._webinRestService.updateXml(ReportType.dacs, new Blob([xmlDocStr]), action, dateStr)
    return observable;
  }

  updateProjectReleaseDate(orginalXml, form) {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(orginalXml, "text/xml");
    var xmlDocStr = new XMLSerializer().serializeToString(xmlDoc.documentElement);

    let dateStr = this.getFormatedReleseDate(new Date(form.releaseDate))
    var action = { name: "Edit", id: form.id };
    const observable: Observable<string> = this._webinRestService.updateXml(ReportType.projects, new Blob([xmlDocStr]), action, dateStr)
    return observable;
  }

  updateProjectLinks(xmlDoc, pubMedXml) {
    if (xmlDoc.getElementsByTagName("PROJECT_LINKS")[0]) {
      var xmlDocProjectLinks = xmlDoc.getElementsByTagName("PROJECT_LINKS")[0];
      var xrefLinkCnt = xmlDocProjectLinks.getElementsByTagName("XREF_LINK").length;
      var newProjectLinks = pubMedXml.getElementsByTagName("PROJECT_LINKS")[0];
      var newXrefLinkCnt = newProjectLinks.getElementsByTagName("PROJECT_LINK").length;

      // Remove old XREF_LINK [ PubMed ] tag
      for (var i = 0; i < xrefLinkCnt; i++) {
        xmlDocProjectLinks.getElementsByTagName("XREF_LINK")[0].parentElement.remove();
      }

      // Add new XREF_LINK [ PubMed ] tag
      for (var j = 0; j < newXrefLinkCnt; j++) {
        /**  
         * The appendChild() method of DOM element moves the element from newProjectLinks to existingProjectLinks (it dose not copy )
         * that is why we are adding [0]th element always to the xml document.
         */
        xmlDocProjectLinks.appendChild(newProjectLinks.getElementsByTagName("PROJECT_LINK")[0])
      }
    } else {
      xmlDoc.getElementsByTagName("PROJECT")[0].append(pubMedXml.getElementsByTagName("PROJECT_LINKS")[0])
    }

  }

  updateProjectAttributes(xmlDoc, attributeXml) {
    if (xmlDoc.getElementsByTagName("PROJECT_ATTRIBUTES")[0]) {
      xmlDoc.getElementsByTagName("PROJECT_ATTRIBUTES")[0].replaceWith(attributeXml.getElementsByTagName("PROJECT_ATTRIBUTES")[0]);
    } else {
      xmlDoc.getElementsByTagName("PROJECT")[0].append(attributeXml.getElementsByTagName("PROJECT_ATTRIBUTES")[0])
    }
  }

  updateDacContacts(xmlDoc, contactsXml) {
    if (xmlDoc.getElementsByTagName("CONTACTS")[0]) {
      xmlDoc.getElementsByTagName("CONTACTS")[0].replaceWith(contactsXml.getElementsByTagName("CONTACTS")[0]);
    }
  }

  updateProjectLocasTags(xmlDoc, locusTagXml) {

    var oldlocusTagPrefixLength = xmlDoc.getElementsByTagName("LOCUS_TAG_PREFIX").length;
    var newlocusTagPrefixLength = locusTagXml.getElementsByTagName("LOCUS_TAG_PREFIX").length

    // Remove old locus_taf_prefix tag
    for (var i = 0; i < oldlocusTagPrefixLength; i++) {
      xmlDoc.getElementsByTagName("LOCUS_TAG_PREFIX")[0].remove();
    }

    for (var j = 0; j < newlocusTagPrefixLength; j++) {
      xmlDoc.getElementsByTagName("SEQUENCING_PROJECT")[0].append(locusTagXml.getElementsByTagName("LOCUS_TAG_PREFIX")[0]);
    }

  }

  getDateString() {
    let currdate = new Date();
    return currdate.getDate() + "-" + currdate.getMonth() + "-" + currdate.getFullYear() + "-" + currdate.getHours() + "-" + currdate.getMinutes() + "-" + currdate.getSeconds() + "-" + currdate.getMilliseconds();
  }


  getFormatedReleseDate(date) {
    return date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
  }

}
