import { ParticipantStatus } from "./StandardTypes/ParticipantStatus";

export class Participant {
    public readonly id: number;
    constructor(
        public readonly name: string,
        public readonly playerId: number,
        public readonly status: ParticipantStatus = ParticipantStatus.Joined,
        id?: number,
    ) {
        if (id) {
            this.id = id;
        }
    }

    isInvited(): boolean {
        return this.status === ParticipantStatus.Invited;
    }

    hasJoined(): boolean {
        return this.status === ParticipantStatus.Joined;
    }

    isReady(): boolean {
        return this.status === ParticipantStatus.Ready;
    }

    isPresent(): boolean {
        return this.hasJoined() || this.isReady();
    }
}