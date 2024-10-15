import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { User } from '../models/user.class';
import { SharedMaterialModule } from '../shared-material.module';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss'],
  standalone: true,
  imports: [SharedMaterialModule],
})
export class DialogEditAddressComponent implements OnInit {
  userForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogEditAddressComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      street: [this.data.user.street, Validators.required],
      zipCode: [this.data.user.zipCode, Validators.required],
      city: [this.data.user.city, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.setFormDisabledState(true);

    const updatedUser = { ...this.data.user, ...this.userForm.value };

    setTimeout(() => {
      this.userService
        .updateUser(updatedUser)
        .then(() => {
          console.log('Benutzer erfolgreich aktualisiert');
          this.dialogRef.close(true);
        })
        .catch((error) => {
          console.error('Fehler beim Aktualisieren des Benutzers:', error);
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
