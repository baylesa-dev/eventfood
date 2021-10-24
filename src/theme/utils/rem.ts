export default function rem(size: number, baseFontSize = 16): string {
    return `${size / baseFontSize}rem`;
}
