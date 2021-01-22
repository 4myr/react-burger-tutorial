import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active>خانه</NavigationItem>
        <NavigationItem link="/orders">خرید</NavigationItem>
    </ul>
);


export default navigationItems;