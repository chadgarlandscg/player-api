import { Wallet } from "./Core/Shop/Wallet";
import { Inventory } from "./Core/Inventory/Inventory";
import { Player } from "./Core/Battle/Player";

const wallet = new Wallet(new GoldPieces(1000));
const inventory = new Inventory();
const player = new Player(wallet, inventory);
player.name = "Sergio";