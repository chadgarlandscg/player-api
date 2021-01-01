import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, OneToOne, OneToMany } from "typeorm";
import { IDataEntity } from "../../base/Data/IDataEntity";
import { GameStatus } from "../../Domain/Models/StandardTypes/GameStatus";
import { GameType } from "./GameType";
import { Participant } from "./Participant";
import { Round } from "./Round";

@Entity()
export class Game implements IDataEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    gameTypeId?: number;
    @ManyToOne(type => GameType)
    type: GameType;

    @Column()
    lobbyName: string;
    @Column()
    lobbyCapacity: number;

    @Column()
    bestOf: number;

    @Column({
        type: "enum",
        enum: GameStatus,
        default: GameStatus.Created
    })
    status: GameStatus;
    
    @OneToMany(type => Round, round => round.game)
    rounds?: Round[];

    @OneToMany(type => Participant, participant => participant.game)
    participants: Participant[];
}