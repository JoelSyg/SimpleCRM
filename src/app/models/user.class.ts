import { Timestamp } from 'firebase/firestore';

export interface IUser {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate?: Date | null;
  street: string;
  zipCode: number | string;
  city: string;
  phone?: string;
}

export class User implements IUser {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate?: Date | null;
  street: string;
  zipCode: number | string;
  city: string;
  phone?: string;

  constructor(obj?: Partial<IUser>) {
    this.id = obj?.id;
    this.firstName = obj?.firstName ?? '';
    this.lastName = obj?.lastName ?? '';
    this.email = obj?.email ?? '';
    this.birthDate = obj?.birthDate ?? null;
    this.street = obj?.street ?? '';
    this.zipCode = obj?.zipCode ?? '';
    this.city = obj?.city ?? '';
    this.phone = obj?.phone ?? '';
  }

  public toFirebaseObject(): any {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      birthDate: this.birthDate ? Timestamp.fromDate(this.birthDate) : null,
      street: this.street,
      zipCode: this.zipCode,
      city: this.city,
      phone: this.phone ?? null,
    };
  }

  static fromFirebaseObject(obj: any): User {
    return new User({
      ...obj,
      birthDate: obj.birthDate?.seconds
        ? new Date(obj.birthDate.seconds * 1000)
        : undefined,
    });
  }
}
