import { FormGroup } from '@angular/forms';

export const confirmPassword = (password: string, confirmPassword: string) => {
    return (formGroup: FormGroup) => {

        const passwordControl = formGroup.controls[password];
        const confirmPasswordControl = formGroup.controls[confirmPassword];

        if (confirmPasswordControl.errors && !confirmPasswordControl.errors['confirmPassword']) return;

        if (passwordControl.value !== confirmPasswordControl.value) {
            confirmPasswordControl.setErrors({ confirmedWrong: true });
        } else {
            confirmPasswordControl.setErrors(null);
        }
    }

}