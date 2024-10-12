interface IUser {
  firstName: string;
  lastName: string;
  birthDate: Date;
  street: string;
  zipCode: number | string;
  city: string;
}

export class User {
  firstName: string;
  lastName: string;
  birthDate: Date;
  street: string;
  zipCode: number | string;
  city: string;

  constructor(obj?: Partial<IUser>) {
    this.firstName = obj?.firstName ?? '';
    this.lastName = obj?.lastName ?? '';
    this.birthDate = obj?.birthDate ?? new Date();
    this.street = obj?.street ?? '';
    this.zipCode = obj?.zipCode ?? '';
    this.city = obj?.city ?? '';
  }
}
