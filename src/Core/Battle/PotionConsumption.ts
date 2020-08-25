export class PotionConsumption implements IPotionConsumption {
    constructor(public readonly potion: IPotion, public readonly timestamp = new Date()) { }
}
