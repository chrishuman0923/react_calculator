import { Operators, romanNumeralMap } from '../../constants';

export interface CalculatorState {
  displayValue?: string;
  firstValue?: number;
  operator?: keyof typeof Operators;
  secondValue?: number;
  isRomanNumeralMode: boolean;
}

export const calculatorInitialState: CalculatorState = {
  isRomanNumeralMode: false,
};

export type CalculatorAction =
  | { name: 'clearCalculator'; payload?: never }
  | { name: 'setDisplayValue'; payload?: string }
  | { name: 'setFirstValue'; payload?: number }
  | { name: 'setSecondValue'; payload?: number }
  | { name: 'setOperator'; payload?: keyof typeof Operators }
  | { name: 'toggleRomanNumeralMode'; payload?: boolean };

const CalculatorReducers = {
  clearCalculator: (state: CalculatorState) => ({ ...calculatorInitialState, isRomanNumeralMode: state.isRomanNumeralMode }),
  setDisplayValue: (state: CalculatorState, payload?: string) => ({ ...state, displayValue: payload }),
  setFirstValue: (state: CalculatorState, payload?: number) => ({ ...state, firstValue: payload }),
  setSecondValue: (state: CalculatorState, payload?: number) => ({ ...state, secondValue: payload }),
  setOperator: (state: CalculatorState, payload?: keyof typeof Operators) => ({ ...state, operator: payload }),
  toggleRomanNumeralMode: (state: CalculatorState, payload: boolean) => ({ ...state, isRomanNumeralMode: payload }),
};

export const calculatorReducer = (state: CalculatorState, { name, payload }: CalculatorAction) => {
  if (!CalculatorReducers[name]) {
    throw new Error(`Reducer ${name} not defined`);
  }

  const nextState: CalculatorState = (CalculatorReducers[name] as any)(state, payload);
  return nextState;
};

export const doesIntValueExist = (intValue?: number): boolean => (intValue === 0 ? true : !!intValue);

export const evaluateCalculation = (firstValue: number, operator: keyof typeof Operators, secondValue: number): number => {
  if (operator === 'add') return firstValue + secondValue;
  if (operator === 'subtract') return firstValue - secondValue;
  if (operator === 'multiply') return firstValue * secondValue;

  return firstValue / secondValue;
};

export const convertToRomanNumeral = (int: number): string => {
  if (int === 0) return '0'; // Keep '0' since there is no '0' roman numeral

  const romanNumeralArray = [];

  for (const key in romanNumeralMap) {
    const romanNumeralValue = romanNumeralMap[key];
    const numeralRepeats = Math.floor(int / romanNumeralValue); // Get the number of times to repeat the numeral

    romanNumeralArray.push(key.repeat(numeralRepeats)); // Add the numeral to the array
    int %= romanNumeralValue; // Re-assign the int value to the remainder

    if (int === 0) break;
  }

  return romanNumeralArray.join('');
};
