interface IGame {
    start(): IGame;
    join(player: IPlayer): IGame;
    readonly players: IPlayer;
    readonly status: GameStatus;
}

interface IBoard {
    readonly players: IPlayer[];
}

type GameStatus = 'created' | 'started' | 'finished';

class Game implements IGame {
    private _status: GameStatus = 'created';
    constructor(public readonly players: IPlayer[] = []) {
        
    }
    get status() {
        return this._status;
    }
    start() {
        if (this.players.length < 3) {
            throw new Error("Game cannot start until 3 players have joined.");
        }
        this._status = 'started';
        return this;
    }
    join(player: IPlayer) {
        if (!this.players.find(p => p.name === player.name)) {
            this.players.push(player);
        }
        return this;
    }
}