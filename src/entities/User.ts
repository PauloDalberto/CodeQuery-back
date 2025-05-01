import { Column, DeleteDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Conversation } from "./Conversation";

@Entity('users')
export class User{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @DeleteDateColumn()
  deleted_at: Date;

  @OneToMany(() => Conversation, (conv) => conv.user)
  conversations: Conversation[];
}