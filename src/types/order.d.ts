type Order = {
    id: number;
    time: string;
    products: Product[];
    promoCode?: string;
};

type AdminOrder = {
    articles: string[]
    id: number
    isdelivered: boolean
    ispaid: boolean
    promocode: string
    total: number
}