import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidatorService } from 'angular4-material-table';

@Injectable()
export class LocationValidatorService implements ValidatorService {
    getRowValidator(): FormGroup {
        return new FormGroup({
            'name': new FormControl(null, Validators.required),
            'houseNumber': new FormControl(),
            'street': new FormControl(),
            'zipCode': new FormControl(),
            'city': new FormControl(),
            'tag': new FormControl()
        });
    }
}
