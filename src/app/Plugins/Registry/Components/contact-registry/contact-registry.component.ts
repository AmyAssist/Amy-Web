import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AsyncTableDataSource } from '../../AsyncTableDataSource';
import { ContactRegistryDataService } from '../../Services/contact-registry-data.service';
import { ContactValidatorService } from './contact-validator.service';
import { Contact } from '../../Objects/contact';
import { ErrorDialogComponent } from '../../../../Components/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'app-contact-registry',
    templateUrl: './contact-registry.component.html',
    styleUrls: ['./contact-registry.component.css'],
    providers: [ContactValidatorService]
})
export class ContactRegistryComponent implements OnInit {

    dataSource: AsyncTableDataSource<Contact>;

    displayedColumns = ['firstName', 'lastName', 'email', 'tag', 'important', 'actionsColumn'];

    constructor(private readonly registryService: ContactRegistryDataService,
        private readonly validatorService: ContactValidatorService,
        private readonly dialog: MatDialog) { }

    ngOnInit() {
        this.dataSource = new AsyncTableDataSource<Contact>([], Contact, this.validatorService,
            this.insertContact.bind(this),
            this.updateContact.bind(this),
            this.deleteContact.bind(this));

        this.refreshContacts();
    }

    refreshContacts() {
        this.registryService.getAll().subscribe((value: Contact[]) => {
            this.dataSource.updateDatasource(value, { emitEvent: true });
        });
    }

    private async insertContact(c: Contact): Promise<boolean> {
        try {
            await this.registryService.post(c).toPromise();
            this.refreshContacts();
            return true;
        } catch (error) {
            this.showError('Could not insert contact: ' + error.toString());
            return false;
        }
    }
    private async updateContact(c: Contact): Promise<boolean> {
        try {
            await this.registryService.post(c).toPromise();
            return true;
        } catch (error) {
            this.showError('Could not update contact: ' + error.toString());
            return false;
        }
    }
    private async deleteContact(c: Contact): Promise<boolean> {
        try {
            await this.registryService.deleteById(c.persistentId).toPromise();
            return true;
        } catch (error) {
            this.showError('Could not delete contact: ' + error.toString());
            return false;
        }
    }

    showError(message: string) {
        this.dialog.open(ErrorDialogComponent, {
            data: { errorMsg: message },
            width: '500px'
        });
    }
}
