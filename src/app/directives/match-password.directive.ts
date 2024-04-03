import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, UntypedFormGroup } from '@angular/forms';
import { CustomValidationService } from '../validation/custom-validation.service';

@Directive({
  selector: '[appMatchPassword]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MatchPasswordDirective, multi: true }]
})
export class MatchPasswordDirective implements Validator {

  @Input('appMatchPassword') MatchPassword: string[] = [];

  constructor(private customValidator: CustomValidationService) { }

  validate(formGroup: UntypedFormGroup): ValidationErrors {
    return this.customValidator.MatchPassword(this.MatchPassword[0], this.MatchPassword[1])(formGroup);
  }

}
