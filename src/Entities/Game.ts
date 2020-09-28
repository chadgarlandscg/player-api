import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Player } from "./Player";

@Entity()
export class Game {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    capacity: number;

    @ManyToMany(type => Player)
    players: Player[];
}