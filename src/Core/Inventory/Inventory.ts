export class ItemInventory implements IInventory {
    public equippedWeapon: IWeapon;
    public equippedArmor: IArmor;
    constructor(private weapons: IWeapon[] = [], private armors: IArmor[] = [], private potions: IPotion[] = []) {

    }
    addArmor(armor: IArmor): IInventory {
        this.armors.push(armor);
        return this;
    };
    addWeapon(weapon: IWeapon): IInventory {
        this.weapons.push(weapon);
        return this;
    };
    addPotion(potion: IPotion): IInventory {
        this.potions.push(potion);
        return this;
    };
    takePotion(name: string): IPotion {
        return this.potions.find(p => p.name === name);
    };
    takeWeapon(name: string): IWeapon {
        return this.weapons.find(p => p.name === name);
    };
    takeArmor(name: string): IArmor {
        this.armors = this.armors.filter(p => p.name !== name);
        return this.armors.find(p => p.name == name);
    };
    equipWeapon(weapon: IWeapon): IInventory {
        this.equippedWeapon = weapon;
        return this;   
    }
    equipArmor(armor: IArmor): IInventory {
        this.equippedArmor = armor;
        
    }
}