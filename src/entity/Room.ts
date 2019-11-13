import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsNotEmpty, ValidateNested } from 'class-validator';

import { Option } from './Option';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  description: string;

  @OneToMany(
    () => Option,
    option => option.room,
    { cascade: true },
  )
  @ValidateNested()
  options: Option[];
}
