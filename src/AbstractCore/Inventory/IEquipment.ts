interface IEquipment {
    equip(): IEquipment;
    unequip(): IEquipment;
    readonly equipped: boolean;
}
