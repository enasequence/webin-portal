import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidationService {

  constructor() { }



  MatchPassword(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }

  UniqueEmailValidation(directiveInput: string, emailControl: string) {
    var uniqueEmails = directiveInput.split("|")[0].split(",");
    var action = directiveInput.split("|")[1];
    var updateEmail = directiveInput.split("|")[2]


    if (action === "Update") {
      uniqueEmails = this.removeEmail(updateEmail, uniqueEmails);
    }
    var index = uniqueEmails.indexOf(emailControl)
    return index >= 0 ? { 'nonUniqueEmail': true } : null
  }

  removeEmail(email, emailList) {
    var removeIndex = emailList.indexOf(email);
    emailList.splice(removeIndex, 1);
    return emailList;
  }

  UniqueName(name: string, nameArrayStr: string, action: string): any {
    return (formGroup: FormGroup) => {
      //if(name){
      const nameControl = formGroup.controls[name];
      const nameArr = formGroup.controls[nameArrayStr];
      const actionVal = formGroup.controls[action];

      if (!nameControl) {
        return null;
      }
      let nameArray = [];
      if (nameArr.value) {
        nameArray = JSON.parse(nameArr.value);
      }
      if (actionVal.value === 'Add') {

        if (nameArray.indexOf(nameControl.value) >= 0) {
          nameControl.setErrors({ notUnique: true });
        } else {
          nameControl.setErrors(null);
        }
      }
    }

  }

}
