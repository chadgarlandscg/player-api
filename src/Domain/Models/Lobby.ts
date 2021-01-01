import { ValueObject } from "../../base/Domain/Models/ValueObject";
import { LobbyFullError } from "../Errors/LobbyFullError";
import { Participant } from "./Participant";
import { ParticipantStatus } from "./StandardTypes/ParticipantStatus";

export class Lobby extends ValueObject {
    constructor(
        public readonly name: string,
        public readonly capacity: number,
        public readonly participants: Participant[] = [],
    ) {
        super();
    }

    isFull(): boolean {
        return this.participantsJoined().length === this.capacity;
    }

    allReady(): boolean {
        return this.participantsReady().length === this.participantsJoined().length;
    }

    fullAndReady() {
        return this.isFull() && this.allReady();
    }

    invites(): Participant[] {
        return this.participants.filter(p => p.isInvited());
    }

    participantsJoined(): Participant[] {
        return this.participants.filter(p => p.hasJoined());
    }

    participantsReady(): Participant[] {
        return this.participants.filter(p => p.isReady());
    }

    withParticipant(participant: Participant): Lobby {
        if (this.isFull()) {
            throw new LobbyFullError();
        }
            
        return new Lobby(this.name, this.capacity, [...this.participants, participant]);
    }
}