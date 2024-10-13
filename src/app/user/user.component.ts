import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { SharedMaterialModule } from '../shared-material.module';

import { User } from '../models/user.class';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [SharedMaterialModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {

  users: User[] = [];

  constructor(public dialog: MatDialog, private userService: UserService) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddUserComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.loadUsers();
      }
    });
  }

  async ngOnInit(): Promise<void> {
    this.loadUsers();
  }

  private async loadUsers(): Promise<void> {
    try {
      const users = await this.userService.getUsers();
      this.users = users;
    } catch (error) {
      console.error('Fehler beim Abrufen der Benutzer:', error);
    }
  }
}
