import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user.class';
import { SharedMaterialModule } from '../shared-material.module';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  imports: [SharedMaterialModule],
  standalone: true,
})
export class UserdetailComponent implements OnInit {
  user: User | null = null;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.userService.getUserById(id).then((user) => {
          this.user = user;
        });
      }
    });
  }

  openEditUserDialog() {
    if (this.user) {
      this.dialog
        .open(DialogEditUserComponent, {
          data: { user: this.user },
        })
        .afterClosed()
        .subscribe((result) => {
          if (result) {
            this.loadUser();
          }
        });
    }
  }

  openEditAddressDialog() {
    if (this.user) {
      this.dialog
        .open(DialogEditAddressComponent, {
          data: { user: this.user },
        })
        .afterClosed()
        .subscribe((result) => {
          if (result) {
            this.loadUser();
          }
        });
    }
  }

  loadUser(): void {
    if (this.user && this.user.id) {
      this.userService
        .getUserById(this.user.id)
        .then((updatedUser) => {
          this.user = updatedUser;
        })
        .catch((error) => {
          console.error('Fehler beim Laden der Benutzerdaten:', error);
        });
    }
  }
}
