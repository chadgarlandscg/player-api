export class Wallet implements IWallet {
    private _goldPieces: IGoldPieces;
    constructor(private readonly initialGoldPieces: IGoldPieces) {
        this._goldPieces = initialGoldPieces;
        this.canAfford = this.canAfford.bind(this);
        this.cannotAfford = this.cannotAfford.bind(this);
    }
    add(goldPieces: IGoldPieces): IWallet {
        this._goldPieces.plus(goldPieces);
        return this;
    }
    take(howMany: number): IGoldPieces {
        return this._goldPieces.minus(howMany);
    }
    get goldPieces(): number {
        return this._goldPieces.value;
    }
    get can(): { afford: (howMany: number) => boolean; not: { afford: (howMany: number) => boolean; }; } {
        return {
            afford: this.canAfford,
            not: {
                afford: this.cannotAfford
            }
        };
    }
    canAfford(howMany: number): boolean {
        return this._goldPieces.value > howMany;
    }
    cannotAfford(howMany: number) {
        return !this.canAfford(howMany);
    };
}
