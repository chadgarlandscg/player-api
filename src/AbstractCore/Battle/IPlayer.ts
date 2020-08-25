interface IPlayer extends IFighter, IShopper {
    readonly inventory: IInventory;
    name: string;
}