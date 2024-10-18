import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { SharedMaterialModule } from '../shared-material.module';

@Component({
  selector: 'app-dialog-delete-confirm',
  templateUrl: './dialog-delete-confirm.component.html',
  styleUrls: ['./dialog-delete-confirm.component.scss'],
  imports: [SharedMaterialModule],
  standalone: true,
})
export class DialogDeleteConfirmComponent {
  isDeleting = false;

  constructor(
    private dialogRef: MatDialogRef<DialogDeleteConfirmComponent>,
    private userService: UserService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { user: any },
  ) {}

  closeDialog() {
    this.dialogRef.close(false);
  }

  deleteUser() {
    this.isDeleting = true;
    setTimeout(() => {
      if (this.data.user && this.data.user.id) {
        this.userService
          .deleteUser(this.data.user.id)
          .then(() => {
            this.dialogRef.close(true);
            this.router.navigate(['/user']);
          })
          .catch((error) => {
            console.error('Error deleting user:', error);
          })
          .finally(() => {
            this.isDeleting = false;
          });
      }
    }, 250);
  }
}
