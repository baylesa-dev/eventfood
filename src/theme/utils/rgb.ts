function hexToRgb(hex: string): string {
    let r = '';
    let g = '';
    let b = '';

    if (hex.length === 4) {
        r = `0x${hex[1]}${hex[1]}`;
        g = `0x${hex[2]}${hex[2]}`;
        b = `0x${hex[3]}${hex[3]}`;
    } else if (hex.length === 7) {
        r = `0x${hex[1]}${hex[2]}`;
        g = `0x${hex[3]}${hex[4]}`;
        b = `0x${hex[5]}${hex[6]}`;
    }

    return `${+r},${+g},${+b}`;
}

/**
 * Returns the rgba values from an hexadecimal value and an alpha value.
 *
 * The returned string has the following format: `rgba(number, number, number, number)`.
 *
 * @param hex Two format are accepted: `#fff` or `#ffffff`.
 * @param alpha A number between `1` and `0`.
 */
export function rgba(hex: string, alpha: number): string {
    return `rgba(${hexToRgb(hex)},${alpha})`;
}

/**
 * Returns the rgba values from an hexadecimal value.
 *
 * The returned string has the following format : `rgb(number, number, number)`.
 *
 * @param hex Two format are accepted: `#fff` or `#ffffff`.
 */
export function rgb(hex: string): string {
    return `rgb(${hexToRgb(hex)})`;
}
