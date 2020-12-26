import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Game } from "./Game";

@Entity()
export class Player {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    code: string;
}