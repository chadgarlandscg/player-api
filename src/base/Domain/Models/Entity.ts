export class Entity {
    public readonly id: number;
    constructor(id?: number) {
        if (id) {
            this.id = id;
        }
    }
}