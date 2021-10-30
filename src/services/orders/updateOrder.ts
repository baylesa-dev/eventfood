import axios from "axios";

import { BASE_URL } from "services";

export function setOrderPaid(id: number) {
    let secret = "";
    if (typeof window !== "undefined") {
        secret = localStorage.getItem('secret') || ''
    }
    return axios.post(`${BASE_URL}/orders/${id}/isPaid`, {}, { headers: { 'Authorization': secret } })
}

export function setOrderDelivered(id: number) {
    let secret = "";
    if (typeof window !== "undefined") {
        secret = localStorage.getItem('secret') || ''
    }

    return axios.post(`${BASE_URL}/orders/${id}/isDelivered`, {}, { headers: { 'Authorization': secret } })
}