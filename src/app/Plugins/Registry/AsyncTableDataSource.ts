import {TableDataSource} from 'angular4-material-table';
import {ValidatorService} from 'angular4-material-table/src/validator.service';
import {TableElement} from 'angular4-material-table/src/table-element';

/**
 * Table data source for asynchronous insert, update, delete. Uses callbacks for validation.
 *
 * @author Benno Krauß
 */
export class AsyncTableDataSource<T> extends TableDataSource<T> {

    insertCallback: (T) => Promise<boolean>;
    updateCallback: (T) => Promise<boolean>;
    deleteCallback: (T) => Promise<boolean>;

    constructor(data: T[], dataType: new () => T, validatorService: ValidatorService,
                insertCallback: (T) => Promise<boolean>,
                updateCallback: (T) => Promise<boolean>,
                deleteCallback: (T) => Promise<boolean>) {
        super(data, dataType, validatorService);
        this.insertCallback = insertCallback;
        this.updateCallback = updateCallback;
        this.deleteCallback = deleteCallback;
    }

    confirmHandler(row: TableElement<T>) {
        if (!row.validator.valid) {
            return;
        }

        if (row.id === -1) {
            // This is a new row
            this.insertCallback(row.currentData).then(confirm => {
                if (confirm) {
                    super.confirmCreate(row);
                }
            });
        } else {
            // This is an updated row
            this.updateCallback(row.currentData).then(confirm => {
                if (confirm) {
                    super.confirmEdit(row);
                }
            });
        }
    }

    deleteOrCancelHandler(row: TableElement<T>) {
        if (row.id === -1) {
            // Delete pressed on a new (unsaved) row, we simply delete it
            this.delete(row.id);
        } else if (row.editing) {
            // Pressed cancel during editing, reset row to state before edits
            row.cancelOrDelete();
        } else {
            // Row was not new (unsaved) and deletion was requested. We need to ask our observer about it before deleting the row
            this.deleteCallback(row.currentData).then(confirm => {
               if (confirm) {
                    this.delete(row.id);
               }
            });
        }
    }
}

