import { Attack } from "./Attack";
import { PotionConsumption } from "./PotionConsumption";

export class Fighter implements IFighter {
    private static readonly INITIAL_HEALTH: 100;
    private _health: number;
    constructor(
        private readonly attacksTaken: IAttack[] = [], 
        private readonly attacksDealt: IAttack[] = [], 
        private readonly potionsConsumed: IPotionConsumption[] = []
    ) {}

    protected get basePower() { return 2.0 };
    protected get baseResistance() { return 1.0 };
    attack(defender: IDefender): IDefender {
        const attack = new Attack(this);
        const defendedAttack = defender.defend(attack);
        this.attacksDealt.push(defendedAttack);
        return defender;
    }
    get power() {
        return this.basePower;
    }
    defend(attack: IAttack): IAttack {
        attack.defender = this;
        this.attacksTaken.push(attack);
        return attack;
    }
    consume(potion: IPotion): IFighter {
        this.potionsConsumed.push(new PotionConsumption(potion));
        return this;
    }
    get resistance() {
        return this.baseResistance;
    }
    get health() {
        const health = Fighter.INITIAL_HEALTH - this.missingHealth;
        return health;
    }
    get hasAttacked() {
        return !!(this.attacksDealt && this.attacksDealt.length);
    }

    private get healthChangeEvents(): HealthChangeEvent[] {
        const healthChangeEvents = this.attacksTaken
            .map(attack => new HealthChangeEvent(attack))
            .concat(this.potionsConsumed.map(potionConsumption => new HealthChangeEvent(null, potionConsumption)))
            .sort((p1, p2) => p1.timestamp.getTime() - p2.timestamp.getTime());

        return healthChangeEvents;
    }
    private get missingHealth(): number {
        const missingHealth = this.healthChangeEvents
            .reduce((sum, event) => sum += event.change, 0);
        return missingHealth < Fighter.INITIAL_HEALTH ? missingHealth : Fighter.INITIAL_HEALTH;
    }
}

class HealthChangeEvent {
    public readonly change: number;
    public readonly timestamp: Date;
    constructor(private readonly attack?: IAttack, private readonly potionConsumption?: IPotionConsumption) {
        if (attack && potionConsumption || (!attack && !potionConsumption)) {
            throw new Error("Health change event must be based on attack or potion");
        }
        this.change = attack?.damage || -potionConsumption?.potion.healing;
        this.timestamp = attack?.timestamp || potionConsumption?.timestamp;
    }
}