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
    constructor(id?: number, participants: Participant[] = []) {
        super(id);
        this.participants = participants;
    }
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
        private readonly startAutomatically: boolean = false,
    ) {
        super(state);
        this.lobby = new Lobby(this.state.lobbyName, this.state.lobbyCapacity, this.state.participants);
    }

    isCreated(): boolean {
        return this.status === GameStatus.Created;
    }

    isStarted(): boolean {
        return this.status === GameStatus.Started;
    }

    isFinished(): boolean {
        return this.status === GameStatus.Finished;
    }

    addParticipant(participant: Participant): void {
        if (this.isStarted() || this.isFinished()) {
            throw new DomainError("Can't join a game that's started or ended.");
        }
        const newLobby = this.lobby.withParticipant(participant);
        this.lobby = newLobby;
        if (this.lobby.fullAndReady() && this.startAutomatically) {
            this.start();
        }
    }

    start(): void {
        if (this.isStarted() || this.isFinished()) {
            throw new DomainError("Can't start a game that's started or ended.");
        }
        this.state.status = GameStatus.Started;
    }

    protected isComplete(): boolean {
        return false;
    }

    finish(): void {
        if (!this.isComplete()) {
            throw new DomainError("Can't end a game that's incomplete.");
        }
        this.state.status = GameStatus.Started;
    }
}

