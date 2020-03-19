import React, { useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

/**
 * Component that takes a single text input and will call onEnter with the input value as arg when enter is pressed.
 * @param {*} props
 */
const EnterInput = props => {
  const [value, setValue] = useState('');

  const handleValueChange = value => {
    if (!value) {
      return;
    }
    props.onEnter(value);
    setValue('');
  };

  const handleKeyDown = event => {
    if (event.keyCode === 13) {
      handleValueChange(value);
    }
  };

  return (
    <InputGroup>
      <FormControl
        placeholder={props.desc}
        value={value}
        onChange={event => {
          setValue(event.target.value);
        }}
        onKeyUp={handleKeyDown}
      />
    </InputGroup>
  );
};

export default EnterInput;
