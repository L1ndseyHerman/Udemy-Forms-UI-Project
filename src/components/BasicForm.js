import useInput from "../hooks/use-input";

const isNotEmpty = value => value.trim() !== '';
const isEmail = value => value.includes('@');

const BasicForm = (props) => {

  //  An alias for value:
  const {
    value: enteredFirstName,
    isValid: enteredFirstNameIsValid, 
    hasError: firstNameInputHasError, 
    valueChangeHandler: firstNameChangedHandler, 
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstNameInput
    //  This function gets executed in use-input. (validateValue(enteredValue)).
  } = useInput(isNotEmpty);

    const {
      value: enteredLastName,
      isValid: enteredLastNameIsValid, 
      hasError: lastNameInputHasError, 
      valueChangeHandler: lastNameChangedHandler, 
      inputBlurHandler: lastNameBlurHandler,
      reset: resetLastNameInput
    } = useInput(isNotEmpty);

    const {
      value: enteredEmail,
      isValid: enteredEmailIsValid, 
      hasError: emailInputHasError, 
      valueChangeHandler: emailChangedHandler, 
      inputBlurHandler: emailBlurHandler,
      reset: resetEmailInput
    } = useInput(isEmail);  

    let formIsValid = false;

    if (enteredFirstNameIsValid && enteredLastNameIsValid && enteredEmailIsValid)
    {
      formIsValid = true;
    }

    const formSubmissionHandler = event => {
      event.preventDefault();
  
      if (!formIsValid) {
        return;
      }
  
      resetFirstNameInput();
      resetLastNameInput();
      resetEmailInput();
    };
  
    const firstNameInputClasses = firstNameInputHasError ? 'form-control invalid' : 'form-control';
    const lastNameInputClasses = lastNameInputHasError ? 'form-control invalid' : 'form-control';
    const emailInputClasses = emailInputHasError ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className='control-group'>
        <div className={firstNameInputClasses}>
          <label htmlFor='firstName'>First Name</label>
          <input
           type='text' 
           id='firstName'
           onChange={firstNameChangedHandler} 
           onBlur={firstNameBlurHandler}
           value={enteredFirstName}
          />
          {firstNameInputHasError && <p className="error-text">Please enter a first name.</p>}
        </div>
        <div className={lastNameInputClasses}>
          <label htmlFor='lastName'>Last Name</label>
          <input
           type='text' 
           id='lastName' 
           onChange={lastNameChangedHandler} 
           onBlur={lastNameBlurHandler}
           value={enteredLastName}
          />
          {lastNameInputHasError && <p className="error-text">Please enter a last name.</p>}
        </div>
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='email'>E-Mail Address</label>
        <input 
          type='email' 
          id='email' 
          onChange={emailChangedHandler} 
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {emailInputHasError && <p className="error-text">Please enter a valid email.</p>}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
