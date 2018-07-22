import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidatorService } from 'angular4-material-table';

@Injectable()
export class LocationValidatorService implements ValidatorService {
    getRowValidator(): FormGroup {
        return new FormGroup({
            'name': new FormControl(null, Validators.required),
            'houseNumber': new FormControl(null, Validators.required),
            'street': new FormControl(null, Validators.required),
            'zipCode': new FormControl(null, Validators.required),
            'city': new FormControl(null, Validators.required),
            'tag': new FormControl()
        });
    }
}
