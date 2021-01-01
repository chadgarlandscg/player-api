import { IView } from "../../Controllers/IView";
import { IDto } from "../../Services/IDto";

export interface IViewMapper<TDto extends IDto, TView extends IView> {
    toView(dto: TDto): TView;
}
