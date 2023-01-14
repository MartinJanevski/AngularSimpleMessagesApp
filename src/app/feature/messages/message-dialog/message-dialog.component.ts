import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { modalOpnedSelector } from 'src/app/store/app.selectors';
import { AppStateInterface } from 'src/app/store/store.model';
import { MessageDto } from '../../model/messsage.model';
import * as AppActions from './../../../store/app.actions';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MessageDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<MessageDialogComponent>,
    private formBuilder: FormBuilder,
    private store: Store<AppStateInterface>
  ) {}
  addMessageForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    message: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.store.pipe(select(modalOpnedSelector)).subscribe((isOpned) => {
      if (isOpned) {
        this.onNoClick();
      }
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit(): void {
    if (!this.addMessageForm.valid) {
      return;
    }
    this.store.dispatch(
      AppActions.addMessage({
        message: this.addMessageForm.value as MessageDto,
      })
    );
  }
}
