import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css'

const checkoutSummary = ( props ) => {
	console.log(props);
	return (
		<div className={classes.CheckoutSummary}>
			<h1>We hope it taste well!</h1>
			<div style={{width: '100%', margin: 'auto'}}>
				<Burger ingredients={props.ingredients} /> 
			</div>
			<Button 
				buttonType="danger"
				clicked={props.checkoutCanceller}>CANCEL</Button>
			<Button 
				buttonType="success"
				clicked={props.checkoutContinued}>CONTINUE</Button>
		</div>
	);
}

export default checkoutSummary;