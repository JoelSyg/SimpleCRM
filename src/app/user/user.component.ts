import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { SharedMaterialModule } from '../shared-material.module';
import { User } from '../models/user.class';
import { UserService } from '../services/user.service';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [SharedMaterialModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';

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
    await this.loadUsers();
  }

  private async loadUsers(): Promise<void> {
    try {
      const users = await this.userService.getUsers();
      this.users = users.sort((a, b) => b.created!.getTime() - a.created!.getTime());
      this.filteredUsers = users;
    } catch (error) {
      console.error('Fehler beim Abrufen der Benutzer:', error);
    }
  }

  filterUsers(): void {
    const searchLower = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      (user.firstName + ' ' + user.lastName).toLowerCase().includes(searchLower) ||
      user.zipCode.toString().includes(searchLower) ||
      user.city.toLowerCase().includes(searchLower)
    );
  }
  
}
