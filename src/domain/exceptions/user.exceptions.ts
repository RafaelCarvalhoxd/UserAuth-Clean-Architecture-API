export class UserNotFoundError extends Error {
  constructor() {
    super('User not found');
    this.name = 'UserNotFoundError';
  }
}

export class InvalidPasswordError extends Error {
  constructor() {
    super('Invalid password');
    this.name = 'InvalidPasswordError';
  }
}

export class InvalidTokenError extends Error {
  constructor() {
    super('Invalid token');
    this.name = 'InvalidTokenError';
  }
}

export class UserAlreadyExistsError extends Error {
  constructor() {
    super('User already exists');
    this.name = 'UserAlreadyExistsError';
  }
}
