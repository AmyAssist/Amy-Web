import { Injectable } from '@angular/core';

import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable({
  providedIn: 'root',
})
export class WorkerUpdateService {
  constructor(private readonly update: SwUpdate, private readonly snackbar: MatSnackBar) {
    this.update.available.subscribe(evt => {
      const config = new MatSnackBarConfig();
      config.duration = 6000;
      const snack = this.snackbar.open('New version of the Webapp available.', 'Reload', config);

      snack
        .onAction()
        .subscribe(() => {
          window.location.reload();
        });
    });
  }
}
