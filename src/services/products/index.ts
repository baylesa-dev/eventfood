import axios from "axios";

import { BASE_URL } from "services";

export default async function fetchProducts(): Promise<ArticleResponse> {
    const res = await axios.get<ArticleResponse>(`${BASE_URL}/articles`)

    return res.data
}