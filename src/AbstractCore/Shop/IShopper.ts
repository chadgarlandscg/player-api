interface IShopper {
    readonly wallet: IWallet;
}

interface IWallet {
    take(howMany: number): IGoldPieces;
    add(goldPieces: IGoldPieces): IWallet;
}
