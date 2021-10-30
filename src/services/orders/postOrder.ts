import axios from "axios";

import { BASE_URL } from "services";

export default function postOrder({ promoCode, products }: Omit<Order, 'time' | 'id'>) {
    return axios.post(`${BASE_URL}/orders`, { articles: products, promoCode })
}