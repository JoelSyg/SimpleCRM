import { Injectable } from '@angular/core';
import { Database, ref, get, set, push, update, remove } from '@angular/fire/database';
import { User } from '../models/user.class';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private dbPath = 'users';

  constructor(private db: Database) {}

  addUser(user: User): Promise<void> {
    const userRef = ref(this.db, this.dbPath);
    const newUserRef = push(userRef);
    return set(newUserRef, user.toFirebaseObject());
  }

  async getUsers(): Promise<User[]> {
    const dbRef = ref(this.db, this.dbPath);
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const users = snapshot.val();
      return Object.keys(users).map((key) =>
        User.fromFirebaseObject({ id: key, ...users[key] }),
      );
    } else {
      return [];
    }
  }

  async getUserById(id: string): Promise<User> {
    const userRef = ref(this.db, `users/${id}`);
    return get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        return User.fromFirebaseObject({ id, ...snapshot.val() });
      } else {
        throw new Error('User not found');
      }
    });
  }

  updateUserFields(
    userId: string,
    updatedFields: Partial<User>,
  ): Promise<void> {
    const userRef = ref(this.db, `users/${userId}`);
    return update(userRef, updatedFields);
  }

  deleteUser(userId: string): Promise<void> {
    const userRef = ref(this.db, `users/${userId}`);
    return remove(userRef);
  }

  async getUserCount(): Promise<number> {
    const dbRef = ref(this.db, this.dbPath);
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const users = snapshot.val();
      return Object.keys(users).length;
    } else {
      return 0;
    }
  }
}
