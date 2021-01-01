import { Domain } from "domain";
import { ValueObject } from "../../base/Domain/Models/ValueObject";
import { DomainError } from "../Errors/DomainError";
import { LobbyFullError } from "../Errors/LobbyFullError";
import { Participant } from "./Participant";
import { ParticipantStatus } from "./StandardTypes/ParticipantStatus";

export class Lobby extends ValueObject {
    constructor(
        public readonly name: string,
        public readonly threshold: number,
        public readonly capacity: number,
        public readonly participants: Participant[] = [],
    ) {
        super();
        if (!this.threshold || !this.capacity || !this.name) {
            throw new DomainError("Lobby threshold, capacity, and name are required");
        }
        if (this.threshold > this.capacity) {
            throw new DomainError("Lobby threshold cannot exceed lobby capacity");
        }
        if (this.participants.length > this.capacity) {
            throw new DomainError("Lobby participants cannot exceed capacity");
        }
    }

    isFull(): boolean {
        return this.participantsPresent().length === this.capacity;
    }

    allReady(): boolean {
        return this.participantsReady().length === this.participantsPresent().length;
    }

    isFullEnough() {
        return this.participantsPresent().length === this.threshold;
    }

    fullEnoughAndReady() {
        return this.isFullEnough() === this.allReady();
    }

    fullAndReady() {
        return this.isFull() && this.allReady();
    }

    invites(): Participant[] {
        return this.participants.filter(p => p.isInvited());
    }

    participantsPresent(): Participant[] {
        return this.participants.filter(p => p.isPresent());
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
            
        return new Lobby(this.name, this.threshold, this.capacity, [...this.participants, participant]);
    }
}