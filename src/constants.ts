export interface Button {
  label: string;
  value: number | keyof typeof Operators;
  position: number;
}

export enum Operators {
  add = '+',
  clear = 'C',
  divide = '/',
  equals = '=',
  multiply = '*',
  subtract = '-',
}

export const calculatorButtons: Button[] = [
  { label: '0', value: 0, position: 13 },
  { label: '1', value: 1, position: 8 },
  { label: '2', value: 2, position: 9 },
  { label: '3', value: 3, position: 10 },
  { label: '4', value: 4, position: 4 },
  { label: '5', value: 5, position: 5 },
  { label: '6', value: 6, position: 6 },
  { label: '7', value: 7, position: 0 },
  { label: '8', value: 8, position: 1 },
  { label: '9', value: 9, position: 2 },
  { label: '+', value: 'add', position: 14 },
  { label: '-', value: 'subtract', position: 11 },
  { label: '*', value: 'multiply', position: 7 },
  { label: '/', value: 'divide', position: 3 },
  { label: '=', value: 'equals', position: 13 },
  { label: 'C', value: 'clear', position: 12 },
];

export const positiveOverflowValue = 10000;
export const negativeOverflowValue = -10000;
export const overflowErrorMsg = 'Overflow';

export const romanNumeralMap: Record<string, number> = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1,
};
