import { Router } from "express";

export interface IController {
    readonly base: string;
    readonly router: Router;
}