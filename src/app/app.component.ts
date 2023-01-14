import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ViewEncapsulation } from '@angular/core';
import * as appActions from './store/app.actions';
import { appService } from './app.service';
import * as storeActions from './store/app.actions';
import { errorSelector, isLoadingSelector } from './store/app.selectors';
import { AppStateInterface } from './store/store.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  isLoading$: Observable<boolean>;

  constructor(
    private store: Store<AppStateInterface>,
    private snackBar: MatSnackBar
  ) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
  }
  ngOnInit(): void {
    this.store.dispatch(appActions.getMesseges());
    this.store.pipe(select(errorSelector)).subscribe((error) => {
      if (error)
        this.snackBar.open(error, null, { panelClass: ['red-snackbar'] });
    });
  }
}
