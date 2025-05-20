import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Conversation } from "./Conversation";

@Entity()
export class RepositoryData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" }) 
  filesContent: string; 

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => Conversation)
  @JoinColumn({ name: "conversationUuid", referencedColumnName: "uuid" })
  conversation: Conversation;

  @Column()
  conversationUuid: string;
}
