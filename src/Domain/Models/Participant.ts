import { ParticipantStatus } from "./StandardTypes/ParticipantStatus";

export class Participant {
    constructor(
        public readonly name: string,
        public readonly playerId: number,
        public readonly status: ParticipantStatus,
        public readonly id?: number,
    ) {}
}