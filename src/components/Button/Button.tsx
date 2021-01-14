import React from 'react';
import {IButton, ButtonClasses} from '../../interfaces'

const Button: React.FC<IButton> = ({handleClick, classes, title, children}) => <button className={classes} onClick={handleClick}>{title}{children}</button>

Button.defaultProps = {
    classes: ButtonClasses.Edit,
}

export default Button;
