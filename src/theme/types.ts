/* eslint-disable @typescript-eslint/no-explicit-any */
export type Tokens = Record<string, any>;
export type WithTheme<T = unknown> = T & { theme: any };
