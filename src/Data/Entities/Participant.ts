import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne } from "typeorm";
import { Lobby } from "./Lobby";

@Entity()
export class Participant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    playerId: number;

    @Column()
    lobbyId: number;

    @Column()
    name: string;

    @ManyToOne(type => Lobby)
    lobby: Lobby; 
}