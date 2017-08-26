import expect from 'expect';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import {mount} from 'enzyme';

import { PrivateHeader } from './PrivateHeader';

if(Meteor.isClient){
    describe('PrivateHeader' , function(){
        it('should set button text to logout', function(){
            const wrapper = mount( <PrivateHeader title="Test Title" handleLogout={() => {}}/> );

            const buttonText = wrapper.find('button').text();

            expect(buttonText).toBe('Logout');
        });

        it('should set title to passed prop value' , function(){
            const title = "Test title here";
            const wrapper = mount( <PrivateHeader title={title} handleLogout={() => {}}/> );

            const headerValue = wrapper.find('h1').text();

            expect(headerValue).toBe(title);
        });


        it('should call handleLogout onclick', function(){
            const spy = expect.createSpy();
            const wrapper = mount( <PrivateHeader title='title' handleLogout={spy}/> );
            
            wrapper.find('button').simulate('click');

            expect(spy).toHaveBeenCalled();
        });
    });
}