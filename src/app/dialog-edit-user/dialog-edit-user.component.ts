import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { User } from '../models/user.class';
import { SharedMaterialModule } from '../shared-material.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Timestamp } from 'firebase/firestore';
import {
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  DateAdapter,
  MatNativeDateModule,
} from '@angular/material/core';

// German Date format configuration
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD.MM.YYYY',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss'],
  imports: [SharedMaterialModule, MatDatepickerModule, MatNativeDateModule],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'de-DE' },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
  standalone: true,
})
export class DialogEditUserComponent implements OnInit {
  userForm!: FormGroup;
  isSubmitting = false;
  minDate: Date;
  maxDate: Date;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogEditUserComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
    private dateAdapter: DateAdapter<Date>,
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(1900, 0, 1);
    this.maxDate = new Date(currentYear, 11, 31);
  }

  ngOnInit(): void {
    this.dateAdapter.setLocale('de-DE');

    this.userForm = this.fb.group({
      firstName: [this.data.user.firstName, Validators.required],
      lastName: [this.data.user.lastName, Validators.required],
      birthDate: [this.data.user.birthDate],
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.setFormDisabledState(true);

    const formValues = this.userForm.value;

    const birthDate =
      this.data.user.birthDate instanceof Timestamp
        ? this.data.user.birthDate.toDate()
        : formValues.birthDate;

    const updatedFields = {
      ...formValues,
      birthDate: birthDate ? Timestamp.fromDate(new Date(birthDate)) : null,
    };

    setTimeout(() => {
      this.userService
        .updateUserFields(this.data.user.id!, updatedFields)
        .then(() => {
          console.log('User successfully updated');
          this.dialogRef.close(true);
        })
        .catch((error) => {
          console.error('Error updating user:', error);
        })
        .finally(() => {
          this.isSubmitting = false;
          this.setFormDisabledState(false);
        });
    }, 200);
  }

  setFormDisabledState(isDisabled: boolean) {
    if (isDisabled) {
      this.userForm.disable();
    } else {
      this.userForm.enable();
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
