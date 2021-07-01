import React, {useContext,useEffect, useState} from 'react';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import CartContext from '../../store/cart-context';

function HeaderCartButton(props) {
    const [btnActive, setBtnActive] = useState(false);
    const cartCtx = useContext(CartContext);
    const { items } = cartCtx;
    const numberOfCartItems = items.reduce((curNumber, item) => {
        return curNumber + item.amount; 
    }, 0)

    

    const btnClasses = `${classes.button} ${btnActive ? classes.bump : ''}`;

    useEffect(() => {
        if(items.length === 0){
            return;
        }
        setBtnActive(true);
        const timer = setTimeout(() => {
            setBtnActive(false)
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items]);


    return (
        <button className={btnClasses}
                onClick={props.onClick}    
                >
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>
                Your Cart
            </span>
            <span className={classes.badge}>
                {numberOfCartItems}
            </span>
        </button>
    )
}

export default HeaderCartButton;
