import axios from "axios";

import { BASE_URL } from "services";

export default async function getOrder(id: number) {
    const { data } = await axios.get<Order & { isdelivered: boolean; ispaid: boolean; total: number }>(`${BASE_URL}/orders/${id}`)

    return data
}