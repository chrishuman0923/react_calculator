import { negativeOverflowValue, Operators, overflowMsg, positiveOverflowValue, romanNumeralMap } from '../../constants';

export interface CalculatorState {
  displayValue?: string | number;
  firstValue?: number;
  operator?: keyof typeof Operators;
  secondValue?: number;
  isRomanNumeralMode: boolean;
}

export const calculatorInitialState: CalculatorState = {
  isRomanNumeralMode: false,
};

export type CalculatorAction =
  | { name: 'clearCalculator'; payload?: undefined }
  | { name: 'setDisplayValue'; payload?: number }
  | { name: 'setFirstValue'; payload?: number }
  | { name: 'setSecondValue'; payload?: number }
  | { name: 'setOperator'; payload?: keyof typeof Operators }
  | { name: 'toggleRomanNumeralMode'; payload?: boolean };

const CalculatorReducers = {
  clearCalculator: (state: CalculatorState) => {
    return { ...calculatorInitialState, isRomanNumeralMode: state.isRomanNumeralMode };
  },
  setDisplayValue: (state: CalculatorState, payload?: number) => {
    if (payload && (payload > positiveOverflowValue || payload < negativeOverflowValue)) {
      return { ...state, displayValue: overflowMsg };
    }

    return { ...state, displayValue: payload };
  },
  setFirstValue: (state: CalculatorState, payload?: number) => {
    return { ...state, firstValue: payload };
  },
  setSecondValue: (state: CalculatorState, payload?: number) => {
    return { ...state, secondValue: payload };
  },
  setOperator: (state: CalculatorState, payload?: keyof typeof Operators) => {
    return { ...state, operator: payload };
  },
  toggleRomanNumeralMode: (state: CalculatorState, payload: boolean) => {
    return { ...state, isRomanNumeralMode: payload };
  },
};

export const calculatorReducer = (state: CalculatorState, { name, payload }: CalculatorAction) => {
  if (!CalculatorReducers[name]) {
    throw new Error(`Reducer ${name} not defined`);
  }

  const nextState: CalculatorState = (CalculatorReducers[name] as any)(state, payload);
  return nextState;
};

export const doesIntExist = (int?: number | null): boolean => {
  if (int === 0) return true;
  return !!int;
};

export const evaluateCalculation = (firstValue: number, operator: keyof typeof Operators, secondValue: number): number => {
  if (operator === 'add') {
    return firstValue + secondValue;
  }

  if (operator === 'subtract') {
    return firstValue - secondValue;
  }

  if (operator === 'multiply') {
    return firstValue * secondValue;
  }

  return firstValue / secondValue;
};

export const convertToRomanNumeral = (int: number): string => {
  if (int === 0) return '0'; // No zero in roman numerals

  let romanNumeral = '';

  for (const key in romanNumeralMap) {
    const romanNumeralValue = romanNumeralMap[key];
    const numeralRepeats = Math.floor(int / romanNumeralValue);

    romanNumeral += key.repeat(numeralRepeats); // Repeats the roman numeral as needed
    int %= romanNumeralValue; // Reduce the int by the remaining value

    if (int === 0) {
      break;
    }
  }

  return romanNumeral;
};
