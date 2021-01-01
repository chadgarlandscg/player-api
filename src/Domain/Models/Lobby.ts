import { ValueObject } from "../../base/Domain/Models/ValueObject";
import { LobbyFullError } from "../Errors/LobbyFullError";
import { Participant } from "./Participant";
import { ParticipantStatus } from "./StandardTypes/ParticipantStatus";

export class Lobby extends ValueObject {
    constructor(
        public readonly name: string,
        public readonly capacity: number,
        public readonly participants: Participant[],
    ) {
        super();
    }

    full() {
        return this.participantsReady().length === this.capacity;
    }

    participantsReady(): Participant[] {
        return this.participants.filter(p => p.status === ParticipantStatus.Ready);
    }

    addParticipant(participant: Participant): Lobby {
        if (this.full()) {
            throw new LobbyFullError();
        }
            
        return new Lobby(this.name, this.capacity, [...this.participants, participant]);
    }
}