export type SizeType = {
    width?: number | string;
    height?: number | string;
};

/**
 * Returns an object if `height` and `width` values.
 *
 * @param size
 */
export default function getSizes(
    size: SizeType | number | string | undefined
): SizeType {
    let sizes: SizeType = {};

    switch (typeof size) {
        case 'number':
            sizes = {
                width: size,
                height: size,
            };
            break;
        case 'object':
            sizes = size;
            break;
        default:
            break;
    }

    return sizes;
}
