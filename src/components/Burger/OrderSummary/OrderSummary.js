import React from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map(ingKey => {
        return (
            <li key={ingKey}>
                <span style={{textTransform: 'capitalize'}}>{ingKey}</span>: {props.ingredients[ingKey]}
            </li>)
    })
    return(
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: &nbsp;{props.totlaPrice}</strong></p>
            <p>Continue to Checkout?</p>
            <Button buttonType='danger' clicked={props.purchaseCancled}>CANCEL</Button>
            <Button buttonType='success' clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    );
};

export default orderSummary;