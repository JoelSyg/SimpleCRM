import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { SharedMaterialModule } from '../shared-material.module';
import { User } from '../models/user.class';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [SharedMaterialModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {

  user = new User();

  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
