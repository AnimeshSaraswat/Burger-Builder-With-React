import React from 'react';

import classes from './Button.css'

const button = (props) => (
    <button 
        className={[classes._button, classes[props.buttonType]].join(' ')}
        onClick={props.clicked}
		disabled={props.disabled}>{props.children}</button>
);

export default button;