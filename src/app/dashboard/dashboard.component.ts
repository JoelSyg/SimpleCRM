import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { SharedMaterialModule } from '../shared-material.module';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedMaterialModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  userCount: number = 0;
  today: Date = new Date(); // Heutiges Datum für das Footer-Element

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserCount();
  }

  loadUserCount(): void {
    this.userService.getUserCount().then(count => {
      this.userCount = count;
    }).catch(error => {
      console.error('Error loading user count:', error);
    });
  }
}
