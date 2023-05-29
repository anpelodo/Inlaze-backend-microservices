export class UserAlreadyExist extends Error {
  constructor(msg?: string) {
    super(msg);
    this.name = "UserAlreadyExist";
  }
}
