type Product = {
    articleid: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
};

type Category = {
    name: string;
    products: Product[];
}

type ArticleResponse = {
    categories: Category[]
}