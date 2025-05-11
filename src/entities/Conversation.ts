import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Message } from "./Message";
import { v4 as uuidv4 } from "uuid";

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  repository: string;

  @Column({ nullable: true })
  username: string;

  @Column({ unique: true })
  uuid: string = uuidv4();

  @ManyToOne(() => User, (user) => user.conversations)
  user: User;

  @OneToMany(() => Message, (message) => message.conversation, { cascade: true })
  messages: Message[];
}
