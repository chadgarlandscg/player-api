import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Player  {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;
}