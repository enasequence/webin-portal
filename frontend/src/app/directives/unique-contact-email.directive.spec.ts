import { UniqueContactEmailDirective } from './unique-contact-email.directive';
import { CustomValidationService } from '../validation/custom-validation.service';

describe('UniqueContactEmailDirective', () => {
  it('should create an instance', () => {
    const customValidation=new CustomValidationService();
    const directive = new UniqueContactEmailDirective(customValidation);
    expect(directive).toBeTruthy();
  });
});
