import { FormControl, FormGroup } from '@angular/forms';

export default class ValidateForm {
  static validateAllFormFields(formGroup: FormGroup) {
    // multiple properties in the form -- array so -> iterate over it w/ forEach
    Object.keys(formGroup.controls).forEach((field) => {
      // get the field
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        // make all the control as dirty -- aall error
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        // controller is of type FormGroup so
        this.validateAllFormFields(control); // pass 'control' into validate....()
      }
    });
  }
}
