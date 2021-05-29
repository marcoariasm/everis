import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { typeValidator } from '@affiliates/commons/directives/ng-validator/ng-custom-validator.model';

@Directive({
  selector: '[ngCustomValidator]',
})
export class CustomValidatorDirective {
  private regexIsOnlyNumeric = /^[0-9]+$/;
  private regexAlphaNumeric = /^[0-9a-zA-Z]+$/;
  private regexAlphaNumericWithSpace = /^[0-9a-zA-Z\s]+$/;
  private regexIsOnlyLettersWithSpace = /^[a-zA-Z\s]+$/;
  private regexAlphaNumericWithDash = /^[0-9a-zA-Z-]+$/;
  private regexLatinCharacter = /^[0-9a-zA-Z\s\u00C0-\u00ff,.]+$/;
  constructor(
    private elementRef: ElementRef
  ) { }

  @Input() inputLength: string;
  @Input('ngCustomValidator') typeValidator: string;

  @HostListener('input', ['$event'])
  onInputChange(event) {

    const initialValue = this.elementRef.nativeElement.value;

    if (this.typeValidator === typeValidator.isOnlyLettersWithSpace) {
      this.validateValueInput(initialValue, event, this.regexIsOnlyLettersWithSpace);
    } else if (this.typeValidator === typeValidator.isOnlyNumeric) {
      this.validateValueInput(initialValue, event, this.regexIsOnlyNumeric);
    } else if (this.typeValidator === typeValidator.isAlphaNumericWithSpace) {
      this.validateValueInput(initialValue, event, this.regexAlphaNumericWithSpace);
    } else if (this.typeValidator === typeValidator.isAlphaNumericWithDash) {
      this.validateValueInput(initialValue, event, this.regexAlphaNumericWithDash);
    } else if (this.typeValidator === typeValidator.isAlphaNumeric) {
      this.validateValueInput(initialValue, event, this.regexAlphaNumeric);
    } else if (this.typeValidator === typeValidator.isLatinCharacter) {
      this.validateValueInput(initialValue, event, this.regexLatinCharacter);
    } else {
      if (initialValue.length > this.inputLength) {
        event.stopPropagation();
        this.elementRef.nativeElement.value = initialValue.substr(0, this.inputLength);
      }
    }
  }

  private static validateRegex(initialValue, regex) {
    return !!initialValue.match(regex);
  }

  private validateValueInput(value, ev, regex) {

    if (value.length <= this.inputLength) {
      if (!CustomValidatorDirective.validateRegex(value, regex)) {
        ev.stopPropagation();
        this.elementRef.nativeElement.value = value.substr(0, value.length - 1);
      }
    } else {
      ev.stopPropagation();
      this.elementRef.nativeElement.value = value.substr(0, this.inputLength);

      if (this.typeValidator === typeValidator.isOnlyNumeric) {
        this.validateInputValueOnPaste(value, regex, this.elementRef.nativeElement.value);
      } else if (this.typeValidator === typeValidator.isOnlyLettersWithSpace) {
        this.validateInputValueOnPaste(value, regex, this.elementRef.nativeElement.value);
      } else if (this.typeValidator === typeValidator.isAlphaNumericWithSpace) {
        this.validateInputValueOnPaste(value, regex, this.elementRef.nativeElement.value);
      } else if (this.typeValidator === typeValidator.isAlphaNumericWithDash) {
        this.validateInputValueOnPaste(value, regex, this.elementRef.nativeElement.value);
      } else if (this.typeValidator === typeValidator.isLatinCharacter) {
        this.validateInputValueOnPaste(value, regex, this.elementRef.nativeElement.value);
      } else {
        this.validateInputValueOnPaste(value, regex, this.elementRef.nativeElement.value);
      }
    }
  }

  private validateInputValueOnPaste(value, regex, newValue) {
    if (!CustomValidatorDirective.validateRegex(value, regex)) {
      this.elementRef.nativeElement.value = value.substr(0, newValue - 1);
    }
  }

}
