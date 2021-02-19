import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});
describe("<NavigationItems />", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    })
    it("NavigationItems has specific length", () => {
        
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
    it("NavigationItems for authentication", () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
});