interface IInventory {
    addEquipment(equipmentItem: IEquipment): IInventory;
    equip(equipment: IEquipment): IEquipment;
    
    addPotion(potion: IPotion): IInventory;
    take(potion: IPotion): IPotion;
}