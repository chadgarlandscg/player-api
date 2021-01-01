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
}