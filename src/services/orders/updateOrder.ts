import axios from "axios";

import { BASE_URL } from "services";

export function setOrderPaid(id: number) {
    // @ts-ignore
    var s = localStorage.getItem('secret');
    // @ts-ignore
    return axios.post(`${BASE_URL}/orders/${id}/isPaid`, {}, { headers: { 'Authorization': s } })
}

export function setOrderDelivered(id: number) {
    // @ts-ignore
    var s = localStorage.getItem('secret');
    // @ts-ignore
    return axios.post(`${BASE_URL}/orders/${id}/isDelivered`, {}, { headers: { 'Authorization': s } })
}