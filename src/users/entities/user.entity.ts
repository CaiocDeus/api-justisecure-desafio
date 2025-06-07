import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid', {
        name: 'id',
    })
    id?: string | undefined;

    @Column()
    username: string;

    @Column()
    password: string;
}