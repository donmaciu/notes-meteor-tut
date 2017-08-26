import expect from 'expect';
import { Meteor } from 'meteor/meteor';

import { Notes } from './notes';


if(Meteor.isServer){
    const noteOne = {
            _id: 'testNoteId1',
            title: 'My Title',
            body: 'My body for note',
            updatedAt: 0,
            userId: 'testUserId1'
    };

    const noteTwo = {
            _id: 'testNoteId2',
            title: 'My Title Two',
            body: 'Mrowki',
            updatedAt: 0,
            userId: 'testUserId2'
    };

    beforeEach(function(){
        Notes.remove({});
        Notes.insert(noteOne);
        Notes.insert(noteTwo);
    });
    describe('notes', function(){
        it('should insert new note', function(){
            const userId = 'testId';
            const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId});
            
            

            expect(Notes.findOne({_id , userId })).toExist();
        });

        it('should not insert note if not auth',function(){
            expect(()=>{
                Meteor.server.method_handlers['notes.insert']();
            }).toThrow();
        });

        it('should remove note', function(){
            Meteor.server.method_handlers['notes.remove'].apply({userId: noteOne.userId} , [noteOne._id]);
            
            expect(Notes.findOne({_id: noteOne._id})).toNotExist();
        });

        it('should not remove notes if not authenticated', function(){
            expect(()=>{
                Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne._id]);
            }).toThrow();
        });

        it('should not remove note if invalid id', function(){
            expect(()=>{
                Meteor.server.method_handlers['notes.remove'].apply({userId: noteOne.userId});
            }).toThrow();
        });

        it('should update note', function(){
            const title = "this is an updated title";
            Meteor.server.method_handlers['notes.update'].apply(
                {userId: noteOne.userId},
                [noteOne._id, {title}]
            );

            const note = Notes.findOne(noteOne._id);

            expect(note.updatedAt).toBeGreaterThan(noteOne.updatedAt);

            expect(note).toInclude({
                title,
                body: noteOne.body
            });
        });

        it('should throw error if extra updates' , function(){
            expect(()=>{
                Meteor.server.method_handlers['notes.update'].apply(
                    {userId: noteOne.userId},
                    [noteOne._id , {title: 'thisTitle', name:'someName'}]
                )
            }).toThrow();
        });

        it('should not update note if user was not creator' , function(){
            const title = "this is an updated title";
            Meteor.server.method_handlers['notes.update'].apply(
                {userId: 'testid'},
                [noteOne._id, {title}]
            );

            const note = Notes.findOne(noteOne._id);

            

            expect(note).toInclude(noteOne);
        });

        it('should not update notes if not authenticated', function(){
            expect(()=>{
                Meteor.server.method_handlers['notes.update'].apply(
                    {}, 
                    [noteOne._id , {title: 'title'}]
                );
            }).toThrow();
        });

        it('should not update note if invalid id', function(){
            expect(()=>{
                Meteor.server.method_handlers['notes.update'].apply({userId: noteOne.userId});
            }).toThrow();
        });

        it('should return a users notes' , function(){
            const res = Meteor.server.publish_handlers.notes.apply({userId: noteOne.userId} );
            const notes = res.fetch();

            expect(notes.length).toBe(1);
            expect(notes[0]).toEqual(noteOne);
        });

        it('should return 0 notes for user that has none', function(){
            const res = Meteor.server.publish_handlers.notes.apply({userId: 'noteOne.userI'} );
            const notes = res.fetch();

            expect(notes.length).toBe(0);
        });

    });
}