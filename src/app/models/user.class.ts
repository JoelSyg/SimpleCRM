export interface IUser {
  id?: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  street: string;
  zipCode: number | string;
  city: string;
}

export class User implements IUser {
  id?: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  street: string;
  zipCode: number | string;
  city: string;

  constructor(obj?: Partial<IUser>) {
    this.id = obj?.id;
    this.firstName = obj?.firstName ?? '';
    this.lastName = obj?.lastName ?? '';
    this.birthDate = obj?.birthDate ?? new Date();
    this.street = obj?.street ?? '';
    this.zipCode = obj?.zipCode ?? '';
    this.city = obj?.city ?? '';
  }
}
