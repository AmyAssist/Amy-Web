import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

/**
 * Simple error dialog
 *
 * @author Benno Krauß
 */
@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css']
})
export class ErrorDialogComponent implements OnInit {

  ngOnInit() {
  }

  constructor(private readonly dialogRef: MatDialogRef<ErrorDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  public closeDialog() {
      this.dialogRef.close();
  }

}
