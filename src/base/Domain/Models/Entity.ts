export interface Identifiable {
    readonly id: number;
}

export class Entity implements Identifiable {
    public readonly id: number;
    constructor(id?: number) {
        if (id) {
            this.id = id;
        }
    }
}