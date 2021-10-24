import { Fragment } from 'react';

import NextDocument, {
    DocumentContext,
    DocumentInitialProps,
    Head,
    Html,
    Main,
    NextScript,
} from 'next/document';
import { ServerStyleSheet as StyledServerStyleSheets } from 'styled-components';

export default class Document extends NextDocument {
    static async getInitialProps(
        ctx: DocumentContext
    ): Promise<DocumentInitialProps> {
        const styledSheets = new StyledServerStyleSheets();

        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) =>
                        styledSheets.collectStyles(<App {...props} />),
                });

            const initialProps = await NextDocument.getInitialProps(ctx);

            return {
                ...initialProps,
                styles: (
                    <Fragment key="styles">
                        {initialProps.styles}
                        {styledSheets.getStyleElement()}
                    </Fragment>
                ),
            };
        } finally {
            styledSheets.seal();
        }
    }

    render(): JSX.Element {
        return (
            <Html>
                <Head>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
                        rel="stylesheet"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@100;400;500;600&display=swap"
                        rel="stylesheet"
                    />
                    <meta
                        name="apple-mobile-web-app-status-bar-style"
                        content="black-translucent"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
