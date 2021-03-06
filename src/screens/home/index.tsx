import { ReactElement, useEffect, useState } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import TabPanel from '@mui/lab/TabPanel';
import InputBase from '@mui/material/InputBase';
import { useIntl, defineMessage, FormattedNumber, FormattedMessage } from 'react-intl';
import { useQuery } from 'react-query';

import fetchProducts from 'services/products';

import Layout from 'components/Layout';
import ProductModal from 'components/ProductModal';
import Tabs from 'components/Tabs';

import * as S from './styles';

export default function HomeScreen(): ReactElement {
    const intl = useIntl();
    const { data, isLoading } = useQuery('products', fetchProducts)
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(
        null
    );

    function handleProductClick(product: Product): void {
        setSelectedProduct(product);
        setModalOpen(true);
    }

    useEffect(() => {
        if (!modalOpen) setSelectedProduct(null);
    }, [modalOpen]);

    if (isLoading || !data) {
        return <Layout> Pas de produits</Layout>
    }

    return (
        <>
            <Layout>
                <S.InputWrapper variant="outlined" elevation={0}>
                    <SearchIcon fontSize="small" sx={{ mb: '1px' }} />
                    <InputBase
                        placeholder={intl.formatMessage(
                            defineMessage({
                                description: 'Home - Search bar placeholder',
                                defaultMessage: 'Rechercher un produit',
                            })
                        )}
                        sx={{ ml: 1, flex: 1 }}
                        inputProps={{ style: { padding: '0.3rem 0' } }}
                    />
                </S.InputWrapper>

                <Tabs categories={data.categories.map(({ name }) => name)}>
                    {data.categories.map(({ name, products }, index) => (
                        <TabPanel
                            key={`panel-${name}`}
                            value={`${index}`}
                            sx={{ padding: '1rem' }}>
                            {products.map((p) => (
                                <S.ProductCard
                                    key={p.articleid}
                                    disabled={p.quantity === 0}
                                    onClick={() => handleProductClick(p)}>
                                    <S.ProductDetails>
                                        <S.ProductName>
                                            {p.name}
                                            {p.quantity === 0 &&
                                                <S.ProductSoldOut>
                                                    <FormattedMessage defaultMessage="??puis??" />
                                                </S.ProductSoldOut>
                                            }
                                        </S.ProductName>
                                        <S.ProductPrice>
                                            <FormattedNumber
                                                value={p.price}
                                                style="currency"
                                                currency="EUR"
                                            />
                                        </S.ProductPrice>
                                    </S.ProductDetails>

                                    <S.ProductImage
                                        src={p.image}
                                        height="50px"
                                        width="auto"
                                    />
                                </S.ProductCard>
                            ))}
                        </TabPanel>
                    ))}
                </Tabs>
            </Layout>
            <ProductModal
                product={selectedProduct}
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            />
        </>
    );
}

