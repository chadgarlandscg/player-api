import { IView } from "../../Controllers/IView";
import { IDto } from "../../Services/IDto";

export interface IViewMapper<TView extends IView> {
    toView(dto: IDto): TView;
}
