import { Api, ApiListResponse } from '../base/api';
import { IProduct, IOrderForm, IOrderResult } from '../../types/index';

export interface IApiModel {
    cdn: string,
    items: IProduct[],
    getListCard(): Promise<IProduct[]>,
    postOrderLot(order: IOrderForm): Promise<IOrderResult> 
};

export class ApiModel extends Api {
    cdn: string;
    items: IProduct[];

    constructor(cdn: string, baseUrl: string) {
        super(baseUrl);
        this.cdn = cdn;
    }

    getListCard(): Promise<IProduct[]> {
        return this.get('/product').then((data: ApiListResponse<IProduct>) =>
            data.items.map((item) => ({
                ...item,
                image: this.cdn + item.image,
            }))
        );
    }

    postOrderLot(order: IOrderForm): Promise<IOrderResult> {
        return this.post(`/order`, order).then((data: IOrderResult) => data);
    }
}