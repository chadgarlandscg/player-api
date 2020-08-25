export class Attack implements IAttack {
    constructor(public readonly attacker: IAttacker, public defender: IDefender = null, public readonly timestamp = new Date()) {}
    get damage() {
        if (!this.defender) { return NaN; }
        return this.attacker.power - this.defender.resistance;
    }
}