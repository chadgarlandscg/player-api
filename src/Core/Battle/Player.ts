import { Fighter } from "./Fighter";

export class Player extends Fighter implements IPlayer {
    name: string;
    constructor(
        public readonly wallet: IWallet,
        public readonly inventory: IInventory,
        attacksTaken: IAttack[] = [], 
        attacksDealt: IAttack[] = [], 
        potionsConsumed: IPotionConsumption[] = []
    ) {
        super(attacksTaken, attacksDealt, potionsConsumed);
    }
}


