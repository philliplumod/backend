export class CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  contactNo: bigint;
  birthday: string;
  status: boolean;
  password: string;
}

export class LoginUserDto {
  email: string;
  password: string;
}
