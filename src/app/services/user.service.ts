import { Injectable } from '@angular/core';
import { Database, ref, get, set, push, update } from '@angular/fire/database';
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

  getUserById(id: string): Promise<User> {
    const userRef = ref(this.db, `users/${id}`);
    return get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        return User.fromFirebaseObject({ id, ...snapshot.val() });
      } else {
        throw new Error('User not found');
      }
    });
  }

  updateUser(user: User): Promise<void> {
    const userRef = ref(this.db, `users/${user.id}`);
    const { id, ...userDataWithoutId } = user;
    return update(userRef, userDataWithoutId);
  }
}
