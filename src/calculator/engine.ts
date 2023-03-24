import { ParsedLineType } from "./parser";
import { isNumber } from "./helpers";
import {
  mathOperators,
  mathPriorities,
  mathOperatorsPriorities,
  SingleOperationType,
} from "./mathOperators";

const [FIRST, SECOND, THIRD, FOURTH] = mathPriorities;

export const firstPrioritiesCalc = (stack: ParsedLineType): ParsedLineType =>
  stack.reduce<ParsedLineType>((result, item) => {
    const prevItem = result[result.length - 1];

    if (item in mathOperators && mathOperatorsPriorities[item] === FIRST) {
      const func = mathOperators[item] as SingleOperationType;
      result = [...result.slice(0, -1), func(Number(prevItem))];
    } else {
      result.push(item);
    }
    return result;
  }, []);

export const secondPrioritiesCalc = (stack: ParsedLineType): ParsedLineType =>
  stack.reduce<ParsedLineType>((result, nextItem) => {
    const prevItem = result[result.length - 2];
    const item = result[result.length - 1];

    if (mathOperatorsPriorities[item] === FIRST) {
      throw new TypeError("Unexpected stack!");
    }

    if (!isNumber(String(item)) && mathOperatorsPriorities[item] === SECOND) {
      if (!mathOperators[item]) {
        throw new TypeError("Unexpected stack!");
      }
      result = [
        ...result.slice(0, -2),
        mathOperators[item](Number(prevItem), Number(nextItem)),
      ];
    } else {
      result.push(nextItem);
    }
    return result;
  }, []);

export const thirdPrioritiesCalc = (stack: ParsedLineType): ParsedLineType =>
  stack.reduce<ParsedLineType>((result, nextItem) => {
    const prevItem = result[result.length - 2];
    const item = result[result.length - 1];

    if (
      mathOperatorsPriorities[item] === FIRST ||
      mathOperatorsPriorities[item] === SECOND
    ) {
      throw new TypeError("Unexpected stack!");
    }

    if (!isNumber(String(item)) && mathOperatorsPriorities[item] === THIRD) {
      result = [
        ...result.slice(0, -2),
        mathOperators[item](Number(prevItem), Number(nextItem)),
      ];
    } else {
      result.push(nextItem);
    }
    return result;
  }, []);

export const fourthPrioritiesCalc = (stack: ParsedLineType): number =>
  stack.reduce<number>((result, nextItem, key) => {
    const item = stack[key - 1];
    if (!isNumber(String(item)) && mathOperatorsPriorities[item] === FOURTH) {
      result = mathOperators[item](Number(result), Number(nextItem));
    }
    return Number(result.toFixed(2));
  }, Number(stack[0]));
