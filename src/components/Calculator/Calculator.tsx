import classnames from 'classnames';
import { FC, useReducer } from 'react';

import { calculatorButtons, Operators, overflowMsg } from '../../constants';
import {
  calculatorInitialState,
  calculatorReducer,
  convertToRomanNumeral,
  doesIntExist,
  evaluateCalculation,
} from './Calculator.helpers';
import './Calculator.styles.scss';

export const Calculator: FC = () => {
  const [state, dispatch] = useReducer(calculatorReducer, calculatorInitialState);
  const { displayValue, firstValue, isRomanNumeralMode, operator, secondValue } = state;

  const handleEvaluation = () => {
    if (!doesIntExist(firstValue) || !doesIntExist(secondValue) || !operator) {
      console.error('Invalid calculation');
      return;
    }

    /*
    Had to use a non-null assertion here because TS couldn't figure out that
    I was checking for null integer values with a custom function on line 21
    */
    const result = evaluateCalculation(firstValue!, operator, secondValue!);
    const formattedResult = result < 0 && isRomanNumeralMode ? 0 : result; // Roman numeral mode can't handle negative numbers

    dispatch({ name: 'setDisplayValue', payload: formattedResult });
    dispatch({ name: 'setFirstValue', payload: formattedResult });
    return;
  };

  const handleOperatorClick = (operator: keyof typeof Operators) => {
    dispatch({ name: 'setOperator', payload: operator });
    dispatch({ name: 'setSecondValue' });
  };

  const handleNumberEntry = (int: number) => {
    // User is entering a new first number
    if (!operator) {
      const concatenatedInt = !!firstValue ? `${firstValue}${int}` : `${int}`;
      const formattedInt = concatenatedInt.replace(/^0+/, ''); // Remove leading zeros

      dispatch({ name: 'setFirstValue', payload: Number(formattedInt) });
      dispatch({ name: 'setDisplayValue', payload: Number(formattedInt) });
      return;
    }

    // User is entering a new second number
    const concatenatedInt = !!secondValue ? `${secondValue}${int}` : `${int}`;
    const formattedInt = concatenatedInt.replace(/^0+/, ''); // Remove leading zeros

    dispatch({ name: 'setSecondValue', payload: Number(formattedInt) });
    dispatch({ name: 'setDisplayValue', payload: Number(formattedInt) });
  };

  const handleButtonClick = (value: keyof typeof Operators | number): void => {
    if (value === 'clear') return dispatch({ name: 'clearCalculator' });
    if (value === 'equals') return handleEvaluation();
    if (typeof value === 'string') return handleOperatorClick(value);

    handleNumberEntry(value);
  };

  const handleCheckboxChange = () => {
    dispatch({ name: 'toggleRomanNumeralMode', payload: !isRomanNumeralMode });
  };

  const sortedCalculatorButtons = calculatorButtons.sort((a, b) => a.position - b.position);
  const formattedDisplayValue =
    displayValue === overflowMsg || !displayValue
      ? displayValue
      : isRomanNumeralMode
      ? convertToRomanNumeral(Number(displayValue))
      : Intl.NumberFormat().format(Number(displayValue));

  return (
    <div className='calculator'>
      <div className='checkbox-container'>
        <input name='roman-numeral-checkbox' type='checkbox' checked={isRomanNumeralMode} onChange={handleCheckboxChange} />
        <label htmlFor='roman-numeral-checkbox'>Roman Numeral Mode</label>
      </div>

      <input className='calculator-display' type='text' value={formattedDisplayValue || ''} readOnly />

      <div className='calculator-buttons'>
        {sortedCalculatorButtons.map(({ label, value }) => {
          const isClearButton = value === 'clear';
          const isNumberButton = typeof value === 'number';
          const formattedLabel = isNumberButton ? (isRomanNumeralMode ? convertToRomanNumeral(Number(label)) : label) : label;
          const isDisabled = !isClearButton && displayValue === overflowMsg;

          return (
            <button
              className={classnames('button', { disabled: isDisabled })}
              key={label}
              onClick={() => handleButtonClick(value)}
              disabled={isDisabled}
            >
              {formattedLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
};
