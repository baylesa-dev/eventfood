import { ReactElement, useEffect } from 'react';

import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider as ReduxProvider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import useStore from 'store/useStore';
import theme from 'theme';

const { GlobalStyle } = theme;

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps): ReactElement {
    const store = useStore(pageProps.initialReduxState);
    const persistor = persistStore(store, {}, () => {
        persistor.persist();
    });

    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles && jssStyles.parentNode)
            jssStyles.parentNode.removeChild(jssStyles);
    }, []);

    return (
        <ReduxProvider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <QueryClientProvider client={queryClient}>
                    <StyledThemeProvider theme={theme}>
                        <GlobalStyle />
                        <Component {...pageProps} />
                    </StyledThemeProvider>
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </PersistGate>
        </ReduxProvider>
    );
}
