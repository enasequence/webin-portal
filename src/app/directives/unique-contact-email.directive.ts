import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormGroup, AbstractControl } from '@angular/forms';
import { CustomValidationService } from '../validation/custom-validation.service';

@Directive({
  selector: '[appUniqueContactEmail]',
  providers: [{ provide: NG_VALIDATORS, useExisting: UniqueContactEmailDirective, multi: true }]
})

export class UniqueContactEmailDirective implements Validator{

  constructor(private customValidator: CustomValidationService) { }

 @Input('appUniqueContactEmail') uniqueEmailsInput: string;

 
  validate(control: AbstractControl): { [key: string]: any } | null {

    return this.customValidator.UniqueEmailValidation(this.uniqueEmailsInput, control.value);
  }

}
