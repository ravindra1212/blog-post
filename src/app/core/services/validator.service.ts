import { AbstractControl, ValidatorFn } from '@angular/forms';

/**
 * This Class use for custom validator
 * @author Ravindra Lande
 * @return Object
 */
export default class CoreValidator {

    /**
     * This function helps into match two fields
     * @param controlName - first control name
     * @param checkControlName - second control name
     * @returns Validation Object 
     */
    static match(controlName: string, checkControlName: string): ValidatorFn {

        return (controls: AbstractControl) => {

            const control = controls.get(controlName);

            const checkControl = controls.get(checkControlName);

            if (checkControl?.errors && !checkControl.errors['notMatch']) {
                return null;
            }

            if (control?.value !== checkControl?.value) {

                controls.get(checkControlName)?.setErrors({ notMatch: true });

                return { notMatch: false };

            } else {

                return null;

            }
        };
    }
    
}