import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';
import { connect } from 'react-redux';

const navigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" active>خانه</NavigationItem>
            { props.isAuthenticated ? <NavigationItem link="/orders">خرید</NavigationItem> : null }
            { !props.isAuthenticated ? <NavigationItem link="/auth">احراز هویت</NavigationItem> : null }
            { props.isAuthenticated ? <NavigationItem link="/auth/logout">خروج</NavigationItem> : null }
        </ul>
    );
}

export default navigationItems;