import React from 'react';
import buffetPic from "../../assets/FoodOrderImage.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from './HeaderCartButton';


function Header(props) {
    return (
        <React.Fragment>
            <header className={classes.header}>
                <h1>Sample Restaurant</h1>
                <HeaderCartButton onClick={props.onShowCart} />
            </header>
            <div className= {classes['main-image']}>
                <img src={buffetPic} alt="A table filled with lots of unhealthy stuff"/>
            </div>
        </React.Fragment>
    )
}

export default Header
