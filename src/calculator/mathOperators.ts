export type ScalarOperationType = (first: number, second: number) => number;
export type SingleOperationType = (first: number) => number;

export const mul: ScalarOperationType = (
    first: number,
    second: number
): number => first * second;

export const div: ScalarOperationType = (
    first: number,
    second: number
): number => first / second;

export const add: ScalarOperationType = (
    first: number,
    second: number
): number => first + second;

export const minus: ScalarOperationType = (
    first: number,
    second: number
): number => first - second;

export const squire: SingleOperationType = (first: number): number =>
    first ** 2;

export const pow: ScalarOperationType = (
    first: number,
    second: number
): number => first ** second;

export const factorial: SingleOperationType = function (first: number): number {
    if (first === 0) {
        return 1;
    }
    return first * factorial(first - 1);
};

export const mathOperators: { [key: string]: ScalarOperationType | SingleOperationType } = {
    "*": mul,
    "/": div,
    "+": add,
    "-": minus,
    "^": pow,
    "!": factorial,
    "**": squire,
};

export const mathPriorities: number[] = [1, 2, 3, 4];

const [FIRST, SECOND, THIRD, FOURTH] = mathPriorities;

export const mathOperatorsPriorities: { [key: string]: number } = {
    "**": FIRST,
    "!": FIRST,
    "^": SECOND,
    "*": THIRD,
    "/": THIRD,
    "+": FOURTH,
    "-": FOURTH,
};