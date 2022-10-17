export function getFibonacciNumber(number: number): number {
    if (number === 0 || number === 1) return number;

    return getFibonacciNumber(number - 1) + getFibonacciNumber(number - 2);
}
