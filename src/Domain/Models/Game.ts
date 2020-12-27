import { Aggregate, AggregateState } from "../../base/Domain/Models/Aggregate";
import { IDto } from "../../base/Services/IDto";
import { ConcreteGameType } from "./ConcreteGameType";
import { Lobby } from "./Lobby";
import { Participant } from "./Participant";

export interface IGame extends GameState {
}

export class GameState extends AggregateState implements IDto {
    public readonly id?: number;
    public readonly gameType: string;
    public readonly gameTypeId?: number;
    public readonly lobbyName: string;
    public readonly lobbyCapacity: number;
    public readonly participants: Participant[] = [];
}

export class Game extends Aggregate<GameState> implements IGame {
    readonly gameType: string;
    readonly gameTypeId?: number;
    readonly id: number;
    readonly lobbyName: string;
    readonly lobbyCapacity: number;
    public readonly participants: Participant[];

    private readonly lobby: Lobby;
    constructor(
        state: IGame,
        options: {gameType: string, gameTypeId?: number},
    ) {
        super(state);
        this.lobby = new Lobby(state.participants, state.lobbyCapacity);
        if (options.gameType)
            this.gameType = options.gameType;

        if (options.gameTypeId)
            this.gameTypeId = options.gameTypeId;
    }
}

export class RockPaperScissors extends Game {
    constructor(
        state: Omit<IGame, 'gameType'>,
    ) {
        super({...state, gameType: ConcreteGameType[ConcreteGameType.RockPaperScissors]}, {gameType: ConcreteGameType[ConcreteGameType.RockPaperScissors]})
    }
}