import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsNotEmpty, ValidateNested } from 'class-validator';

import { Option } from './Option';

export interface RoomInterface {
  name: string;
  description?: string;
  options: Option[];
}

@Entity()
export class Room implements RoomInterface {
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
