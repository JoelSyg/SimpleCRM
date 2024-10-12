import { Injectable } from '@angular/core';
import { Database, ref, set } from '@angular/fire/database';
import { User } from './models/user.class';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private dbPath = 'users';

  constructor(private db: Database) {}

  addUser(user: User, userId: string): Promise<void> {
    const userRef = ref(this.db, `${this.dbPath}/${userId}`);
    return set(userRef, { ...user });
  }
}
