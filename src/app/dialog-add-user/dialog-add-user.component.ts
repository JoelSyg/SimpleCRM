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
  styleUrl: './dialog-add-user.component.scss',
  imports: [SharedMaterialModule, MatDatepickerModule],
  providers: [MatDatepickerModule],
  standalone: true,
})
export class DialogAddUserComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogAddUserComponent>,
    private userService: UserService,
  ) {}

  isSubmitting = false;

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
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
    const userId = this.generateUserId();

    setTimeout(() => {
      this.userService
        .addUser(newUser, userId)
        .then(() => {
          console.log('Benutzer erfolgreich in Firebase gespeichert');
          this.dialogRef.close(true);
        })
        .catch((error) => {
          console.error(
            'Fehler beim Speichern des Benutzers in Firebase: ',
            error,
          );
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

  generateUserId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  get lastName() {
    return this.userForm.get('lastName');
  }
}
