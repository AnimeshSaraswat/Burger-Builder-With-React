import React from 'react';

import classes from './Backdrop.css'

const backdrop = (props) => (
    props.show ? <div className={classes._backdrop} onClick={props.clicked}></div> : null
);

export default backdrop;