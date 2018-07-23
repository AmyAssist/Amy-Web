import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidatorService } from 'angular4-material-table';

@Injectable()
export class ContactValidatorService implements ValidatorService {
    getRowValidator(): FormGroup {
        return new FormGroup({
            'firstName': new FormControl(null, Validators.required),
            'lastName': new FormControl(null, Validators.required),
            'important': new FormControl(),
            'email': new FormControl(null, Validators.required),
        });
    }
}
