class Shop implements IShop {
    constructor(private readonly items: IItem[]) {}
    has(item: IItem): boolean {
        return this.items.
    }
}