import axios from "axios";

import { BASE_URL } from "services";

export default async function getOrders() {
    const { data } = await axios.get<AdminOrder[]>(`${BASE_URL}/orders`)

    return data
}