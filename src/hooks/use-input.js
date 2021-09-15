import {useReducer} from 'react';

const initialInputState = {
    value: '',
    isTouched: false
};

const inputStateReducer = (state, action) => {

    if (action.type === 'INPUT') {
        return {value: action.value, isTouched: state.isTouched};
    }
    if (action.type === 'BLUR') {
        //  Apparently, the ordering of params doesn't matter?
        return {isTouched: true, value: state.value};
    }
    if (action.type === 'RESET') {
        return {isTouched: false, value: ''};
    }
    return inputStateReducer;
};

//  The function passed in will decide if valueIsValid is t/f.
const useInput = (validateValue) => {

    const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState);

    //  This calls the function from the other component on enteredValue.
    const valueIsValid = validateValue(inputState.value);
    const hasError = !valueIsValid && inputState.isTouched;

    const valueChangeHandler = event => {
        dispatch({type: 'INPUT', value: event.target.value});
      };

    const inputBlurHandler = event => {
        dispatch({type: 'BLUR'});
      };

    const reset = () => {
        dispatch({type: 'RESET'});
    };

    //  hasError: hasError,
    //  But why aren't the functions set to a property?
    return {
        value: inputState.value, 
        isValid: valueIsValid,
        hasError, 
        valueChangeHandler, 
        inputBlurHandler,
        reset
    };
};

export default useInput;