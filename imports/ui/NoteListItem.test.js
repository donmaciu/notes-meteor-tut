import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { Meteor } from 'meteor/meteor';

import NoteListItem from './NoteListItem';

if(Meteor.isClient){
    describe('NoteListItem', function(){
        it('should render title and timestamp' , function(){
            const title = 'My Title';
            const updatedAt = 1503766003798;
            const wrapper = mount( <NoteListItem note={{title, updatedAt}}/> );

            expect(wrapper.find('h5').text()).toBe(title);
            expect(wrapper.find('p').text()).toBe('26/08/17');
        });

        it('should render empty title as untitled note', function(){
            const defaultTitle = 'Untitled note';
            const wrapper = mount( <NoteListItem note={{title: ''}}/> );

            expect(wrapper.find('h5').text()).toBe(defaultTitle);
        })
    });
}