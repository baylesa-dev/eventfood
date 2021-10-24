import { rem } from '../utils';

export default {
    families: {
        'sans-serif': {
            name: 'Mulish',
            /**
             * @deprecated
             * We use self hosted fonts instead
             */
            url: 'https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap',
        },
        monospace: {
            name: 'IBM Plex Mono',
            /**
             * @deprecated
             * We use self hosted fonts instead
             */
            url: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap',
        },
    },
    sizes: {
        xxxs: rem(10),
        xxs: rem(12),
        xs: rem(14),
        sm: rem(16),
        md: rem(18),
        lg: rem(22),
        xl: rem(28),
        xxl: rem(36),
        xxxl: rem(44),
    },
};
