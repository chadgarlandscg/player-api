import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, OneToOne, OneToMany } from "typeorm";
import { Game } from "./Game";
import { Move } from "./Move";

@Entity()
export class Round {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    gameId: number;
    @ManyToOne(type => Game, game => game.rounds)
    game: Game;

    @Column({nullable: true})
    tieRoundId?: number;
    @OneToOne(type => Round)
    tieRound?: Round;

    @OneToMany(type => Move, move => move.round)
    moves: Move[];
}