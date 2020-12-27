import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne } from "typeorm";
import { Game } from "./Game";
import { Player } from "./Player";

@Entity()
export class Participant {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    playerId: number;
    @ManyToOne(type => Player)
    player?: Game;

    @Column()
    gameId: number;
    @ManyToOne(type => Game)
    game?: Game;

    @Column()
    name: string;
}