import { get } from 'lodash';

// eslint-disable-next-line
export default function getColor(color: string, theme: any): string {
    if (color[0] === '#' || color.startsWith('rgb')) return color;

    const themeColor = get(theme.colors, color);

    // Useful to use only `primary` and not `primary.main`.
    return typeof themeColor === 'string'
        ? themeColor
        : get(theme.colors, `${color}.main`);
}
