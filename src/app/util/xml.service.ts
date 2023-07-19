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

  generateStudyXml(form, selectedPubMedArray, attributeArray, locusTagArray, umbrellaType?) {

    let pubMedXml = this.getPubMedXmlTags(selectedPubMedArray);
    let attributeXml = this.getAttributeXmlTags(attributeArray)
    let locusTagXml = this.getlocusTagXmlTags(locusTagArray);
    let alias = uuid();
    let projectType = "";

    // To create Umbrella / Submission project.
    if (umbrellaType) {
      projectType = this.generateUmbrellaTypeProject();
    } else {
      projectType = this.generateSubmissionTypeProject(locusTagXml);
    }

    let projectXml = new Blob(['<?xml version = "1.0" encoding = "UTF-8"?>' +
      '<PROJECT_SET>' +
      '<PROJECT alias="' + alias + '">' +
      '<NAME>' + this.encodeXml(form.studyName) + '</NAME>' +
      '<TITLE>' + this.encodeXml(form.studyTitle) + '</TITLE>' +
      '<DESCRIPTION>' + this.encodeXml(form.description) + '</DESCRIPTION>' +
      projectType +
      pubMedXml +
      attributeXml +
      '</PROJECT>' +
      '</PROJECT_SET>'])
    var action = { name: "add" };
    let dateStr = this.getFormatedReleseDate(new Date(form.releaseDate));
    const observable: Observable<string> = this._webinRestService.updateXml(ReportType.projects, projectXml, 'Add', dateStr, form)
    return observable;
  }

  generateDacXml(form, contactArray) {

    let contactXml = this.getContactXmlTags(contactArray);
    let alias = uuid();

    let dacXml = new Blob(['<?xml version = "1.0" encoding = "UTF-8"?>' +
      '<DAC_SET>' +
      '<DAC alias="' + alias + '">' +
      '<TITLE>' + this.encodeXml(form.title) + '</TITLE>' +
      contactXml +
      '</DAC>' +
      '</DAC_SET>'])
    var action = { name: "add" };
    //let dateStr = this.getFormatedReleseDate(new Date(form.releaseDate));
    const observable: Observable<string> = this._webinRestService.updateXml(ReportType.dacs, dacXml, 'Add', form)
    return observable;
  }

  generateUmbrellaTypeProject() {
    return "<UMBRELLA_PROJECT/>";
  }

  generateSubmissionTypeProject(locusTagXml) {
    let submissionProj = '<SUBMISSION_PROJECT>' +
      '<SEQUENCING_PROJECT>' +
      locusTagXml +
      '</SEQUENCING_PROJECT>' +
      '</SUBMISSION_PROJECT>';

    return submissionProj;
  }

  generateDacPolicyXml(form) {

    let alias = uuid();
    let dacPolicyXml = new Blob(['<?xml version = "1.0" encoding = "UTF-8"?>' +
      '<POLICY_SET>' +
      '<POLICY alias="' + alias + '" center_name="" accession="" >' +
      '<TITLE>' + this.encodeXml(form.title) + '</TITLE>' +
      '<DAC_REF accession="' + form.dacRef + '"/>' +
      '<POLICY_TEXT>' + this.encodeXml(form.policyText) + '</POLICY_TEXT>' +
      '</POLICY>' +
      '</POLICY_SET>'])
    var action = { name: "add" };
    const observable: Observable<string> = this._webinRestService.updateXml(ReportType.policies, dacPolicyXml, 'Add')
    return observable;
  }

  generateDacDatasetXml(form, typeArr, refArr) {
    let typeXml = this.getDatasetTypeXml(typeArr);
    let refXml = this.getRefXml(refArr);
    let alias = uuid();
    let dacDatasetXmlStr = '' +
      '<DATASETS>' +
      '<DATASET alias="' + alias + '" broker_name="EGA" >' +
      '<TITLE>' + this.encodeXml(form.title) + '</TITLE>' +
      '<DESCRIPTION>' + this.encodeXml(form.description) + '</DESCRIPTION>' +
      typeXml +
      refXml +
      '<POLICY_REF accession="' + form.policyRef + '"/>' +
      '</DATASET>' +
      '</DATASETS>';
    console.log(dacDatasetXmlStr)
    let dacDatasetXml = new Blob([dacDatasetXmlStr]);
    var action = { name: "add" };
    const observable: Observable<string> = this._webinRestService.updateXml(ReportType.datasets, dacDatasetXml, 'Add')
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
    if (locusTagArray) {
      locusTagArray.forEach(element => {
        locusTagXml += '<LOCUS_TAG_PREFIX>' +
          element.locusTag +
          '</LOCUS_TAG_PREFIX>';
      });
    }

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

  getDatasetTypeXml(typeArr) {
    let typeXml = "";
    typeArr.forEach(element => {
      typeXml += "<DATASET_TYPE>" + element + "</DATASET_TYPE>"
    });
    return typeXml;
  }

  getRefXml(refArr) {
    let refXml = "";
    let ref = ""
    refArr.forEach(val => {
      ref = "ANALYSIS_REF"
      if (val.trim().startsWith("EGAR")) {
        ref = "RUN_REF";
      }
      refXml += '<' + ref + ' accession="' + val + '"/>'
    });
    return refXml;
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
    const observable: Observable<string> = this._webinRestService.updateXml(ReportType.projects, new Blob([xmlDocStr]), action, dateStr, form)
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

  updateDacPolicyXml(orginalXml, form) {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(orginalXml, "text/xml");
    var titleTag = xmlDoc.getElementsByTagName("TITLE")[0];
    var policyTextTag = xmlDoc.getElementsByTagName("POLICY_TEXT")[0];

    /** Check if the tag is empty and set the values accordingly */
    if (titleTag) {
      titleTag.hasChildNodes() ? titleTag.childNodes[0].nodeValue = form.title : titleTag.appendChild(xmlDoc.createTextNode(form.title));
    }

    /** Check if the tag is empty and set the values accordingly */
    if (policyTextTag) {
      policyTextTag.hasChildNodes() ? policyTextTag.childNodes[0].nodeValue = form.policyText : policyTextTag.appendChild(xmlDoc.createTextNode(form.policyText));
    }

    var xmlDocStr = new XMLSerializer().serializeToString(xmlDoc.documentElement);
    //console.log(xmlDocStr);
    let dateStr = this.getFormatedReleseDate(new Date(form.releaseDate))

    var action = { name: "Edit", id: form.id };
    const observable: Observable<string> = this._webinRestService.updateXml(ReportType.policies, new Blob([xmlDocStr]), action, dateStr)
    return observable;
  }

  updateDacDatasetXml(orginalXml, form, typeArr, refArr) {

    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(orginalXml, "text/xml");
    let newTypeXml = parser.parseFromString('<DATASET_TYPES>' + this.getDatasetTypeXml(typeArr) + '</DATASET_TYPES>', "text/xml");
    let newRefXml = parser.parseFromString('<REFS>' + this.getRefXml(refArr) + '</REFS>', "text/xml");

    var titleTag = xmlDoc.getElementsByTagName("TITLE")[0];
    var descriptionTag = xmlDoc.getElementsByTagName("DESCRIPTION")[0];
    var datasetType = xmlDoc.getElementsByTagName("DATASET_TYPE");
    var runRef = xmlDoc.getElementsByTagName("RUN_REF");
    var analysisRef = xmlDoc.getElementsByTagName("ANALYSIS_REF");
    var datasetRef = xmlDoc.getElementsByTagName("DATASET")[0];

    /** Check if the tag is empty and set the values accordingly */
    if (titleTag) {
      titleTag.hasChildNodes() ? titleTag.childNodes[0].nodeValue = form.title : titleTag.appendChild(xmlDoc.createTextNode(form.title));
    }

    /** Check if the tag is empty and set the values accordingly */
    if (descriptionTag) {
      descriptionTag.hasChildNodes() ? descriptionTag.childNodes[0].nodeValue = form.description : descriptionTag.appendChild(xmlDoc.createTextNode(form.description));
    }

    /** Removing DATASET_TYPE, RUN_REF and ANALYSIS_REF */
    while (datasetType.length > 0) {
      xmlDoc.getElementsByTagName("DATASET_TYPE")[0].remove();
    }

    while (runRef.length > 0) {
      xmlDoc.getElementsByTagName("RUN_REF")[0].remove();
    }

    while (analysisRef.length > 0) {
      xmlDoc.getElementsByTagName("ANALYSIS_REF")[0].remove();
    }

    /** Adding DATASET_TYPE, RUN_REF and ANALYSIS_REF */
    var datasetTypes = newTypeXml.getElementsByTagName("DATASET_TYPES")[0];
    while (datasetTypes.hasChildNodes()) {
      datasetRef.append(datasetTypes.firstChild);
      datasetTypes.removeChild[0];
    }

    var refs = newRefXml.getElementsByTagName("REFS")[0];
    while (refs.hasChildNodes()) {
      datasetRef.append(refs.firstChild);
      refs.removeChild[0];
    }

    /** Removing POLICY_REF and appending to the end due to validation errors when uppended before other RUN_REF or ANALYSIS_REF */
    var policyRefClone = xmlDoc.getElementsByTagName("POLICY_REF")[0].cloneNode(true);
    xmlDoc.getElementsByTagName("POLICY_REF")[0].remove();
    datasetRef.append(policyRefClone);



    var xmlDocStr = new XMLSerializer().serializeToString(xmlDoc.documentElement);
    console.log(xmlDocStr);
    let dateStr = this.getFormatedReleseDate(new Date(form.releaseDate))

    var action = { name: "Edit", id: form.id };
    const observable: Observable<string> = this._webinRestService.updateXml(ReportType.datasets, new Blob([xmlDocStr]), action, dateStr)
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
    if (date.getFullYear()) { //check if valid date
      return date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
    }
  }

  encodeXml(xmlContent) {
    const replacements = {
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      '"': '&quot;',
      "'": '&apos;'
    };

    return xmlContent.replace(/[<>&"']/g, match => replacements[match]);
  }
}
