import { GameStatus } from "../Domain/Models/StandardTypes/GameStatus";

export class GameView {
    id: number;

    gameType: string;
    gameTypeId: number;

    lobbyName: string;
    lobbyThreshold: number;
    lobbyCapacity: number;

    startAutomatically: boolean;

    bestOf: number;
    status: GameStatus;

    participants: ParticipantView[];
}

export class ParticipantView {
    playerId: number;
    name: string;
}