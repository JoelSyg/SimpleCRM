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
    const { id, ...userDataWithoutId } = user;
    return set(newUserRef, { ...userDataWithoutId });
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

  getUserById(id: string): Promise<User> {
    const userRef = ref(this.db, `users/${id}`);
    return get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        return { id, ...snapshot.val() };
      } else {
        throw new Error('Benutzer nicht gefunden');
      }
    });
  }

  updateUser(user: User): Promise<void> {
    const userRef = ref(this.db, `users/${user.id}`);
    if (!user.id) {
      throw new Error('Benutzer hat keine gültige ID');
    }
    const userDataWithoutId = { ...user };
    delete userDataWithoutId.id;
    return update(userRef, userDataWithoutId);
  }
}
