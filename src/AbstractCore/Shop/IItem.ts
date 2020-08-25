interface IItem {
    readonly price: number;
    readonly type: IItemType;
    readonly name: string;
}

type IItemType = 'Weapon' | 'Armor' | 'Potion'