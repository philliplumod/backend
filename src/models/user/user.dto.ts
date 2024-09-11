export class CreateUserDto {
  first_name: string;
  last_name: string;
  email: string;
  contact_no: bigint;
  birthday: string;
  status: boolean;
  password: string;
}

export class LoginUserDto {
  email: string;
  password: string;
}
