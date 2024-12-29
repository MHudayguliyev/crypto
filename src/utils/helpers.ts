export function capitalize(str: string) {
    return str.split(' ').map(item => item[0].toUpperCase() + item.substring(1, item.length)).join(' ')
}
export const toRem = (value: number): string => {
    return (value / 16) + 'rem';;
}
export function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}