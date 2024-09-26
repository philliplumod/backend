import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { User } from 'src/models/user/entities/user.entity';

@Entity({ name: 'tbl_document' })
export class UserDocument {
  @PrimaryGeneratedColumn('uuid')
  document_id: string;

  @Column({ unique: true })
  license_no: string;

  @Column()
  license_id: string;

  @Column()
  support_id_type: string;

  @Column({ unique: true })
  support_no: string;

  @OneToOne(() => User, (user) => user.document, {
    onDelete: 'CASCADE',
    eager: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
