import { ValueObject } from "../../base/Domain/Models/ValueObject";
import { Participant } from "./Participant";
import { ParticipantStatus } from "./StandardTypes/ParticipantStatus";

class Lobby extends ValueObject {
    constructor(
        public readonly participants: Participant[],
        private readonly capacity: number,
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
            throw new Error("Lobby already full!");
        }
            
        return new Lobby([...this.participants, participant], this.capacity);
    }
}