import { MatchPasswordDirective } from './match-password.directive';
import { CustomValidationService } from '../validation/custom-validation.service';

describe('MatchPasswordDirective', () => {
  it('should create an instance', () => {
    const customValidation = new CustomValidationService();
    const directive = new MatchPasswordDirective(customValidation);
    expect(directive).toBeTruthy();
  });
});
