import axios from "axios";

import { BASE_URL } from "services";

export function setOrderPaid(id: number) {
    var s = localStorage.getItem('secret');
    return axios.post(`${BASE_URL}/orders/${id}/isPaid`, {}, { headers: { 'Authorization': s } })
}

export function setOrderDelivered(id: number) {
    var s = localStorage.getItem('secret');
    return axios.post(`${BASE_URL}/orders/${id}/isDelivered`, {}, { headers: { 'Authorization': s } })
}