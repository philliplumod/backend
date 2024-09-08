// export class User {
//   id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
  
//   constructor(id: string, firstName: string, lastName: string, email: string) {
//     this.id = id;
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.email = email;
//   }
// }
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;
}

