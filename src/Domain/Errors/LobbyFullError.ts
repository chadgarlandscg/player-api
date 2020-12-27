import { DomainError } from "./DomainError";

export class LobbyFullError extends DomainError {
    constructor() {
        super("Lobby already full.");
    }
}