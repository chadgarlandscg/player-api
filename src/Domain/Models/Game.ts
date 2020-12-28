import { Aggregate, AggregateState } from "../../base/Domain/Models/Aggregate";
import { IDto } from "../../base/Services/IDto";
import { ConcreteGameType, GameType, IGameType } from "./ConcreteGameType";
import { Lobby } from "./Lobby";
import { Participant } from "./Participant";

export interface IGame extends GameState {
}

export class GameState extends AggregateState implements IDto {
    public readonly type: IGameType;
    public readonly lobbyName: string;
    public readonly lobbyCapacity: number;
    public readonly participants?: Participant[] = [];
}

export class Game extends Aggregate<GameState> implements IGame {
    readonly type: IGameType;
    readonly lobbyName: string;
    readonly lobbyCapacity: number;
    public readonly participants?: Participant[] = [];

    public readonly lobby: Lobby;
    constructor(
        state: IGame,
    ) {
        super(state);
        this.lobby = new Lobby(state.participants, state.lobbyCapacity);
        this.participants = state.participants;
        if (state.type) {
            this.type = state.type;
        }
    }
}

