import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { SharedMaterialModule } from '../shared-material.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  DateAdapter,
} from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';
import { User } from '../models/user.class';

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
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss'],
  imports: [SharedMaterialModule, MatDatepickerModule, MatNativeDateModule],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'de-DE' },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
  standalone: true,
})
export class DialogAddUserComponent implements OnInit {
  userForm!: FormGroup;
  isSubmitting = false;
  minDate: Date;
  maxDate: Date;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogAddUserComponent>,
    private userService: UserService,
    private dateAdapter: DateAdapter<Date>,
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(1900, 0, 1);
    this.maxDate = new Date(currentYear, 11, 31);
  }

  ngOnInit(): void {
    this.dateAdapter.setLocale('de-DE');

    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      street: ['', Validators.required],
      zipCode: ['', Validators.required],
      city: ['', Validators.required],
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
    const newUser = new User(formValues);

    setTimeout(() => {
      this.userService
        .addUser(newUser)
        .then(() => {
          console.log('User successfully saved to Firebase');
          this.dialogRef.close(true);
        })
        .catch((error) => {
          console.error('Error saving user to Firebase: ', error);
        })
        .finally(() => {
          this.isSubmitting = false;
          this.setFormDisabledState(false);
        });
    }, 500);
  }

  setFormDisabledState(isDisabled: boolean) {
    if (isDisabled) {
      this.userForm.disable();
    } else {
      this.userForm.enable();
    }
  }

  get lastName() {
    return this.userForm.get('lastName');
  }
}
