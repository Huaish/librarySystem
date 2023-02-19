import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function boughtDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const date = new Date(control.value);
    const today = new Date();
    if (date > today) {
      // console.log("boughtDateValidator: " + control.value);
      return { boughtDate: true };
    }
    return null;
  };
}
