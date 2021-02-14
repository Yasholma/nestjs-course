import { USERNAME } from 'src/utils/constants';
import * as bcrypt from 'bcrypt';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Task } from 'src/tasks/task.entity';

@Entity()
@Unique([USERNAME])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany(() => Task, (task) => task.user, { eager: true })
  tasks: Task[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
