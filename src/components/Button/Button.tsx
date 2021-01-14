import React from 'react';
import {IButton, ButtonClasses} from '../../interfaces'

const Button: React.FC<IButton> = ({handleClick, classes, title}) => <button className={classes} onClick={handleClick}>{title}</button>

Button.defaultProps = {
    classes: ButtonClasses.Edit,
}

export default Button;
