export interface CreateGameCommand {
    lobbyName: string;
    lobbyThreshold: number;
    lobbyCapacity: number;
    startAutomatically: boolean;
    bestOf: number;
    gameTypeId: number;
}