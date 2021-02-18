import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormGroup, ValidationErrors } from '@angular/forms';
import { CustomValidationService } from '../validation/custom-validation.service';

@Directive({
  selector: '[appUniqueNameByArray]',
  providers: [{ provide: NG_VALIDATORS, useExisting: UniqueNameByArrayDirective, multi: true }]
})
export class UniqueNameByArrayDirective implements Validator {

  
  @Input('appUniqueNameByArray') UniqueNameByArray: string[] = [];

  constructor(private customValidator: CustomValidationService) { }

  validate(formGroup: FormGroup): ValidationErrors {
    return this.customValidator.UniqueName(this.UniqueNameByArray[0], this.UniqueNameByArray[1], this.UniqueNameByArray[2])(formGroup);
  }
 }
