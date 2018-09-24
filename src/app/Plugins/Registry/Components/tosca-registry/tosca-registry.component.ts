import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToscaRegistryDataService } from '../../Services/tosca-registry-data.service';
import { Tosca } from '../../Objects/tosca';
import { ToscaValidatorService } from './tosca-validator.service';
import { MatDialog } from '@angular/material';
import { ErrorDialogComponent } from '../../../../Components/error-dialog/error-dialog.component';
import { AsyncTableDataSource } from '../../AsyncTableDataSource';

@Component({
  selector: 'app-tosca-registry',
  templateUrl: './tosca-registry.component.html',
  styleUrls: ['./tosca-registry.component.css'],
  providers: [ToscaValidatorService]
})
export class ToscaRegistryComponent implements OnInit {

  dataSource: AsyncTableDataSource<Tosca>;

  displayedColumns = ['key', 'value', 'tag', 'actionsColumn'];

  constructor(private readonly registryService: ToscaRegistryDataService,
    private readonly validatorService: ToscaValidatorService,
    private readonly dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource = new AsyncTableDataSource<Tosca>([], Tosca, this.validatorService,
      this.insertTosca.bind(this),
      this.updateTosca.bind(this),
      this.deleteTosca.bind(this));

    this.refreshTosca();
  }

  refreshTosca() {
    this.registryService.getAll().subscribe((value: Tosca[]) => {
      this.dataSource.updateDatasource(value, { emitEvent: true });
    });
  }

  private async insertTosca(t: Tosca): Promise<boolean> {
    try {
      await this.registryService.post(t).toPromise();
      this.refreshTosca();
      return true;
    } catch (error) {
      this.showError('Could not insert tosca setup: ' + error.toString());
      return false;
    }
  }

  private async updateTosca(t: Tosca): Promise<boolean> {
    try {
      await this.registryService.post(t).toPromise();
      return true;
    } catch (error) {
      this.showError('Could not update tosca setup: ' + error.toString());
      return false;
    }
  }

  private async deleteTosca(t: Tosca): Promise<boolean> {
    try {
      await this.registryService.deleteById(t.persistentId).toPromise();
      return true;
    } catch (error) {
      this.showError('Could not delete tosca setup: ' + error.toString());
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
