import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Entity } from "typeorm";
import { TaskStatus } from "../enums/task-status.enum";
@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid', {
        name: 'id',
    })
    id?: string | undefined;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({
        type: "enum",
        enum: TaskStatus,
        default: TaskStatus.PENDING
    })
    status: TaskStatus;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
