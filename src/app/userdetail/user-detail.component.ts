import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user.class';
import { SharedMaterialModule } from '../shared-material.module';

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

  openEditMenu() {}
}
