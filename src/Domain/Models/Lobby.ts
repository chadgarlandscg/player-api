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
        public readonly isPrivate: boolean = false
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

    invitations(): Participant[] {
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

    private withParticipant(participant: Participant): Lobby {
        if (this.isFull()) {
            throw new LobbyFullError();
        }           
        return new Lobby(this.name, this.threshold, this.capacity, [...this.participants, participant]);
    }

    withJoinedParticipant(playerId: number, name: string): Lobby {
        if (this.needsInvitation(playerId)) {
            throw new DomainError("This lobby requires an invitation in order to join");
        }
        return this.withParticipant(new Participant(name, playerId));
    }

    withInvitation(playerId: number, name: string): Lobby {
        if (this.alreadyInvited(playerId)) {
            throw new DomainError("This participant has already been invited to the lobby");
        }
        return this.withParticipant(new Participant(name, playerId, ParticipantStatus.Invited));
    }

    alreadyInvited(playerId: number): boolean {
        return !!this.invitations().find(p => p.playerId === playerId);
    }

    needsInvitation(playerId: number): boolean {
        return !this.alreadyInvited(playerId) && this.isPrivate;
    }

    alreadyPresent(playerId: number): boolean {
        return !!this.participantsPresent().find(p => p.playerId === playerId);
    }
}