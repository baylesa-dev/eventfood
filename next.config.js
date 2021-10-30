/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const withTM = require('next-transpile-modules')([
    '@mui/material',
    '@mui/system',
]);
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
    const nextConfig = {
        reactStrictMode: true,
    };

    if (phase === PHASE_DEVELOPMENT_SERVER) {
        return withTM(nextConfig);
    }

    return withPWA(
        withTM({
            ...nextConfig,
            pwa: {
                dest: 'public',
                runtimeCaching,
            },
        })
    );
};
