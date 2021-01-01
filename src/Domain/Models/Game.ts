import { Aggregate, AggregateState } from "../../base/Domain/Models/Aggregate";
import { IDto } from "../../base/Services/IDto";
import { DomainError } from "../Errors/DomainError";
import { ConcreteGameType, GameType, IGameType } from "./ConcreteGameType";
import { Lobby } from "./Lobby";
import { Participant } from "./Participant";
import { GameStatus } from "./StandardTypes/GameStatus";

export interface IGame extends IDto {
    readonly type: IGameType;
    readonly lobbyName: string;
    readonly lobbyCapacity: number;
    readonly participants: Participant[];
    readonly bestOf: number;
    readonly status: GameStatus;
}

export class GameState extends AggregateState implements IGame {
    public type: IGameType;
    public lobbyName: string;
    public lobbyCapacity: number;
    public participants: Participant[];
    public bestOf: number;
    public status: GameStatus;
}

export class Game extends Aggregate<GameState> implements IGame {
    get type(): IGameType {
        return this.state.type;
    };

    get lobbyName(): string {
        return this.lobby.name;
    }
    get lobbyCapacity(): number {
        return this.lobby.capacity;
    }
    get participants(): Participant[] {
        return this.lobby.participants;
    }

    get status(): GameStatus {
        return this.state.status || GameStatus.Created;
    }

    get bestOf(): number {
        return this.state.bestOf;
    }

    private lobby: Lobby;

    constructor(
        state: GameState,
        private readonly startWhenFull: boolean = false,
    ) {
        super(state);
        this.lobby = new Lobby(this.lobbyName, this.lobbyCapacity, this.participants);
    }

    started(): boolean {
        return this.status === GameStatus.Created;
    }

    addParticipant(participant: Participant): void {
        if (this.started()) {
            throw new DomainError("Game has already started.");
        }
        const newLobby = this.lobby.addParticipant(participant);
        this.lobby = newLobby;
        if (this.lobby.full() && this.startWhenFull) {
            this.start();
        }
    }

    private start(): void {
        this.state.status = GameStatus.Started;
    }
}

