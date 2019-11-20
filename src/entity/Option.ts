import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

import { Room } from './Room';

export interface OptionInterface {
  id: number;
  label: string;
  value: string;
  room: Room;
}

@Entity()
export class Option implements OptionInterface {
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

  static New({ label, value }) {
    const option: OptionInterface = new Option();
    option.label = label;
    option.value = value;
    return option;
  }
}
