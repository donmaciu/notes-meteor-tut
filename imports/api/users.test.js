import expect from 'expect';
import {Meteor} from 'meteor/meteor';
import {validateNewUser } from './users';

if(Meteor.isServer){
    describe('Users' , function (){

        it('should allow valid email address', function(){
            const testUser = {
                emails: [
                    {
                        address: "donmaciu@interia.pl"
                    }
                ]
            };

            const res = validateNewUser(testUser);

            expect(res).toBe(true);
        });

        it("should reject invalid email", function(){
            const testUser = {
                emails: [
                    {
                        address: "donmacifsenteria.pl"
                    }
                ]
            };

        expect(() => {
            validateNewUser(testUser);
        }).toThrow();
    });
    });

    
}
/* const add = (a , b) => {
    if(typeof b !== 'number'){
        return a + a;
    }
    return a + b;
};

const square = (a) => a * a;


describe('add' , function(){
    it('should add two numbers', function () {
    const res = add(11 , 9);

    expect(res).toBe(20);

  
    });


    it("Should double a single number" , function(){
        const res = add(44);

        expect(res).toBe(88);
    });
});


describe('square' , function(){
    it('should square a number' , function(){
    const res = square(8);

    expect(res).toBe(8*8);
    });
}); */
