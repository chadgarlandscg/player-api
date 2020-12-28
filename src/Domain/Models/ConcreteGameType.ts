import { MoveType } from "./ConcreteMoveType";
import { GameTypeStatus } from "./StandardTypes/GameTypeStatus";

export enum ConcreteGameType {
    RockPaperScissors,
    ApiWars
}

export class IGameType {
    readonly name: string;
    readonly id?: number;
    readonly displayName: string;
    readonly description: string;
    readonly minPlayers: number;
    readonly maxPlayers: number;
    readonly minRounds: number;
    readonly maxRounds: number;
    readonly moveTypes: MoveType[];
    readonly status: GameTypeStatus;
}

export class GameType implements IGameType {
    constructor(gameTypeState: IGameType) {
        this.type = ConcreteGameType[gameTypeState.name as keyof typeof ConcreteGameType];
        this.name = gameTypeState.name;
        if (gameTypeState.id) {
            this.id = gameTypeState.id;
        }
        this.displayName = gameTypeState.displayName;
        this.description = gameTypeState.description;
        this.minPlayers = gameTypeState.minPlayers;
        this.maxPlayers = gameTypeState.maxPlayers;
        this.minRounds = gameTypeState.minRounds;
        this.maxRounds = gameTypeState.maxRounds;
        this.moveTypes = gameTypeState.moveTypes;
        this.status = gameTypeState.status;
    }
    readonly type?: ConcreteGameType;
    readonly name: string;
    readonly id: number;
    readonly displayName: string;
    readonly description: string;
    readonly minPlayers: number;
    readonly maxPlayers: number;
    readonly minRounds: number;
    readonly maxRounds: number;
    readonly moveTypes: MoveType[];
    readonly status: GameTypeStatus;

    isActive(): boolean {
        return status === GameTypeStatus.Active;
    }

    isSupported(): boolean {
        return this.isActive() && this.isConcrete();
    }

    isConcrete(): boolean {
        return !!this.type;
    }
}