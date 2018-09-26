import React, {Component} from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 40,
    cheese: 10,
    meat: 55,
    bacon: 45
}

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        ingredients: null, 
        totalPrice: 60,
        purchasable: false,
		purchasing: false,
		loading: false,
		error: false
	}
	
	componentDidMount() {
		axios.get('https://my-reactive-burger.firebaseio.com/ingredients.json')
			.then(resposnse => {
				this.setState({ingredients: resposnse.data})
			})
			.catch(error => {
				this.setState({error: true})
			});
	}

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map(
            ingKey => {
                return ingredients[ingKey]
            }
        ).reduce((sum, el) =>{
            return sum + el;
        }, 0);
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = Object.assign({}, this.state.ingredients);
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = Object.assign({}, this.state.ingredients);
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
		// alert('You Continue!');
		const queryParams = [];
		for (let i in this.state.ingredients) {
			queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
		}
		queryParams.push('price=' + this.state.totalPrice);
		const queryString = queryParams.join('&');
		this.props.history.push({
			pathname: '/checkout',
			search: '?' + queryString
		});
    }

    render() {
        const disableInfo = {
            ...this.state.ingredients
		}

		let orderSummary = null;

		
		

		let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

		if(this.state.ingredients){
			burger = (
				<Aux>
					<Burger ingredients={this.state.ingredients} />
					<BuildControls
						ingredientAdded={this.addIngredientHandler}
						ingredientRemoved={this.removeIngredientHandler}
						disabled={disableInfo}
						price={this.state.totalPrice}
						purchasable={this.state.purchasable}
						ordered={this.purchaseHandler} />
				</Aux>
			);
			orderSummary = <OrderSummary 
				ingredients={this.state.ingredients} 
				purchaseCancled={this.purchaseCancelHandler}
				purchaseContinued={this.purchaseContinueHandler}
				totlaPrice={this.state.totalPrice} />
		}

		if(this.state.loading) {
			orderSummary = <Spinner />;
		}

        for(let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);