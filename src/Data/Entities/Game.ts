import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne } from "typeorm";
import { GameType } from "./GameType";
import { Player } from "./Player";

@Entity()
export class Game {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    gameTypeId: number;

    @ManyToOne(type => GameType)
    type: GameType;
}