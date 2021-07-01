import React from 'react';
import './Input.module.css';
import classes from './Input.module.css';


const Input = React.forwardRef((props,ref) => {
    return (
        <div className= {classes.input}>
            <label htmlFor={props.input.id} >
                {props.label}
            </label>
            {/* we are adding the spread operator because it a way to make our component
             highly configurable from outside this component */}
            <input ref={ref} {...props.input}/>
        </div>
    );
});

export default Input;
