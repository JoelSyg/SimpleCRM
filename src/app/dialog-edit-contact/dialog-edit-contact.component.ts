import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { User } from '../models/user.class';
import { SharedMaterialModule } from '../shared-material.module';

@Component({
  selector: 'app-dialog-edit-contact',
  templateUrl: './dialog-edit-contact.component.html',
  styleUrls: ['./dialog-edit-contact.component.scss'],
  standalone: true,
  imports: [SharedMaterialModule],
})
export class DialogEditContactComponent implements OnInit {
  userForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogEditContactComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      email: [this.data.user.email, [Validators.required, Validators.email]],
      phone: [this.data.user.phone],
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.setFormDisabledState(true);

    const updatedFields = {
      email: this.userForm.value.email,
      phone: this.userForm.value.phone,
    };

    setTimeout(() => {
      this.userService
        .updateUserFields(this.data.user.id!, updatedFields)
        .then(() => {
          console.log('Contact info updated successfully');
          this.dialogRef.close(true);
        })
        .catch((error) => {
          console.error('Error updating contact info:', error);
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
