import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/entities/user.entity';

@Entity({ name: 'tbl_block' })
export class Block {
  @PrimaryGeneratedColumn('uuid')
  block_id: string;

  @Column({ default: false })
  block_status: boolean;

  @Column()
  message: string;

  @Column()
  user_id: string;

  @CreateDateColumn()
  block_date: Date;

  @OneToOne(() => User, (user) => user.user_id)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
