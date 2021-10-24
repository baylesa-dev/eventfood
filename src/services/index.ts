export const BASE_URL = (url: string): string =>
    process.env.NODE_ENV === 'development'
        ? `http://localhost:7001${url.replace('/api', '')}`
        : url;
