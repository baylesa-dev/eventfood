import axios from "axios";

import { BASE_URL } from "services";

export function setOrderPaid(id: number) {
    return axios.post(`${BASE_URL}/orders/${id}/isPaid`, {}, { headers: { 'Authorization': 'eventsfoodsecret42' } })
}

export function setOrderDelivered(id: number) {
    return axios.post(`${BASE_URL}/orders/${id}/isDelivered`, {}, { headers: { 'Authorization': 'eventsfoodsecret42' } })
}