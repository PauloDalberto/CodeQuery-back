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

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.conversations)
  user: User;

  @OneToMany(() => Message, (message) => message.conversation, { cascade: true })
  messages: Message[];
}
