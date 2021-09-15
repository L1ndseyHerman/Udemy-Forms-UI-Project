import {useState} from 'react';

//  The function passed in will decide if valueIsValid is t/f.
const useInput = (validateValue) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    //  This calls the function from the other component on enteredValue.
    const valueIsValid = validateValue(enteredValue);
    const hasError = !valueIsValid && isTouched;

    const valueChangeHandler = event => {
        setEnteredValue(event.target.value);
      };

    const inputBlurHandler = event => {
        setIsTouched(true);
      };

    const reset = () => {
        setEnteredValue('');
        setIsTouched(false);
    };

    //  hasError: hasError,
    //  But why aren't the functions set to a property?
    return {
        value: enteredValue, 
        isValid: valueIsValid,
        hasError, 
        valueChangeHandler, 
        inputBlurHandler,
        reset
    };
};

export default useInput;