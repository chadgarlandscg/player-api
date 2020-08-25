interface IShop {
    process(purchase: IPurchase): IItem;
    has(item: IItem): boolean;
}

interface IPurchase {
    item: IItem;
    shopper: IShopper;
}