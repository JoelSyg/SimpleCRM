import { Injectable } from '@angular/core';
import { Database, ref, get, set } from '@angular/fire/database';
import { User } from '../models/user.class';

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

  async getUsers(): Promise<User[]> {
    const dbRef = ref(this.db, this.dbPath);
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const users = snapshot.val();
      return Object.keys(users).map((key) => ({
        id: key,
        ...users[key],
      }));
    } else {
      return [];
    }
  }
}
