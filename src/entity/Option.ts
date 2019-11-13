import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

import { Room } from './Room';

@Entity()
export class Option {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @Column()
  @IsNotEmpty({
    context: {
      code: 'EMPTY_OPTION_VALUE',
      message: 'value cannot be empty',
    },
  })
  value: string;

  @ManyToOne(
    () => Room,
    room => room.options,
    { onDelete: 'CASCADE' },
  )
  room: Room;
}
