import {useState} from 'react';

const SimpleInput = (props) => {

  //  Could update this with every keystroke, or at the end with a useRef.
  const [enteredName, setEnteredName] = useState('');
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  const enteredNameIsValid = enteredName.trim() !== '';
  //  Another less-code boolean:
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  let formIsValid = false;

  //  If u had other form inputs, should do for enteredAgeIsValid or whatevs in a useEffect().
    if (enteredNameIsValid) {
      formIsValid = true;
    } else {
      formIsValid = false;
    }

  const nameInputChangeHandler = event => {
    setEnteredName(event.target.value);
  };

  const nameInputBlurHandler = event => {
    setEnteredNameTouched(true);
  };

  const formSubmissionHandler = event => {
    event.preventDefault();

    setEnteredNameTouched(true);

    if (!enteredNameIsValid) {
      return;
    }

    console.log(enteredName);

    //  This is one place where changing the state every keystroke is better,
    //  bec shouldn't really modify a ref, just read it.
    setEnteredName('');
    setEnteredNameTouched(false);
    //  Ng :( Vanilla JS code that manipulates the DOM, when React should manipulate the DOM.
    //nameInputRef.current.value = '';
  };

  const nameInputClasses = nameInputIsInvalid ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input 
          type='text' 
          id='name' 
          onChange={nameInputChangeHandler} 
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {nameInputIsInvalid && <p className="error-text">Name must not be empty.</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
