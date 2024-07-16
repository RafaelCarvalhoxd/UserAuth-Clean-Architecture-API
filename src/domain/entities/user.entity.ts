export class User {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly password: string;

  constructor(name: string, email: string, password: string) {
    this.id = crypto.randomUUID().toString();
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
