import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user.class';
import { SharedMaterialModule } from '../shared-material.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss'],
  imports: [SharedMaterialModule, MatDatepickerModule],
  providers: [MatDatepickerModule],
  standalone: true,
})
export class DialogAddUserComponent implements OnInit {
  userForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogAddUserComponent>,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
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
