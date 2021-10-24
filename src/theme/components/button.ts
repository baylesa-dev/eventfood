import { Tokens } from 'theme/types';

export default function Button(tokens: Tokens): Tokens {
    return {
        fontWeight: 600,
        radius: tokens.radius.sm,
        sizes: {
            xs: {
                fontSize: tokens.fonts.sizes.xxs,
                height: '1.5rem',
                padding: `0 ${tokens.spacings.xs}`,
            },
            sm: {
                fontSize: tokens.fonts.sizes.xs,
                height: '2rem',
                padding: `0 ${tokens.spacings.sm}`,
            },
            md: {
                fontSize: tokens.fonts.sizes.sm,
                height: '2.5rem',
                padding: `0 ${tokens.spacings.md}`,
            },
            lg: {
                fontSize: tokens.fonts.sizes.md,
                height: '3rem',
                padding: `0 ${tokens.spacings.lg}`,
            },
            xl: {
                fontSize: tokens.fonts.sizes.xl,
                height: '3.5rem',
                padding: `0 ${tokens.spacings.xl}`,
            },
        },
    };
}
