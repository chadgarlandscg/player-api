import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Player } from "./Player";

@Entity()
export class GameType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    minPlayers: string;

    @Column()
    maxPlayers: string;

    @Column()
    minRounds: string;

    @Column()
    maxRounds: string;
}