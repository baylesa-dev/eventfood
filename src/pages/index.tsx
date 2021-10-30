import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient } from 'react-query';

import fetchProducts from 'services/products';

import HomeScreen from 'screens/home';

const queryClient = new QueryClient()

export const getServerSideProps: GetServerSideProps = async () => {
    await queryClient.prefetchQuery("products", fetchProducts);

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
}

export default HomeScreen;
