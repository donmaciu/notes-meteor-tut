import {Meteor} from 'meteor/meteor';
import ReactDOM from 'react-dom';
import {Tracker} from 'meteor/tracker';
import {browserHistory} from 'react-router';

import {routes , onAuthChange} from './../imports/routes/routes';
import './../imports/startup/simple-schema-configuration';

import {Session} from 'meteor/session';

Tracker.autorun(()=>{
  const isAuthenticated = !!Meteor.userId();
  const currentPagePrivacy = Session.get('currentPagePrivacy');
  onAuthChange(isAuthenticated, currentPagePrivacy);
});

Tracker.autorun(()=>{
  const selectedNoteId = Session.get('selectedNoteId');
  if(selectedNoteId){
    browserHistory.replace(`/dashboard/${selectedNoteId}`);
    Session.set('isNavOpen' , false);
  }
});

Tracker.autorun(()=>{
  const isNavOpen = Session.get('isNavOpen');
  document.body.classList.toggle('is-nav-open' , isNavOpen);
})

Meteor.startup(()=>{
  Session.set('isNavOpen' , false);
  Session.set('selectedNoteId', undefined);
  ReactDOM.render(routes, document.getElementById('app'));
});