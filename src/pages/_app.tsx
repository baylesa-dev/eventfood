import { ReactElement, useEffect, useState } from 'react';

import { OnErrorFn } from '@formatjs/intl';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MaterialThemeProvider } from '@mui/material/styles';
import type { AppProps as AppDefaultProps } from 'next/app';
import { IntlProvider } from 'react-intl';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider as ReduxProvider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import useStore from 'store/useStore';
import theme, { materialTheme } from 'theme';

const { GlobalStyle } = theme;


/* eslint-disable no-console */
const handleIntlErrors: OnErrorFn = (err): void => {
    if (
        process.env.NODE_ENV === 'development' &&
        err.code !== 'MISSING_TRANSLATION'
    ) {
        console.error(err);
    } else if (process.env.NODE_ENV !== 'development') {
        console.error(err);
    }
};

type AppProps = AppDefaultProps & { messages: Record<string, string> };
export default function App({
    Component,
    pageProps,
    router,
    messages,
}: AppProps): ReactElement {
    const [queryClient] = useState(() => new QueryClient())
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
                    <Hydrate state={pageProps.dehydratedState}>
                        <MaterialThemeProvider theme={materialTheme}>
                            <StyledThemeProvider theme={theme}>
                                <CssBaseline />
                                <GlobalStyle />
                                <IntlProvider
                                    locale={router.locale || 'fr-FR'}
                                    messages={messages}
                                    onError={handleIntlErrors}>
                                    <Component {...pageProps} />
                                </IntlProvider>
                            </StyledThemeProvider>
                        </MaterialThemeProvider>
                    </Hydrate>
                </QueryClientProvider>
            </PersistGate>
        </ReduxProvider>
    );
}
