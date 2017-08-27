import React from 'react';
import {Accounts} from 'meteor/accounts-base';
import {Link} from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

export const PrivateHeader = (props) => {
    const navImageSrc = props.isNavOpen ? "/images/x.svg" : "/images/bars.svg";

    return (
        <div className="header">
            <div className="header__content">
                <img onClick={props.handleNavToggle} src={navImageSrc} className="header__nav-toggle"/>
                <h1 className="header__title">{props.title}</h1>
                <button className="button button--link-text" onClick={() => props.handleLogout()}>Logout</button>
            </div>
        </div>
    );
};

PrivateHeader.propTypes = {
    title: React.PropTypes.string.isRequired,
    handleLogout: React.PropTypes.func.isRequired,
    isNavOpen: React.PropTypes.bool.isRequired,
    handleNavToggle: React.PropTypes.func.isRequired
};

export default createContainer(() => {
    return{
        handleLogout: ()=> Accounts.logout(),
        isNavOpen: Session.get('isNavOpen'),
        handleNavToggle: ()=> Session.set('isNavOpen' , !Session.get('isNavOpen'))
    };
}, PrivateHeader);

/* export default PrivateHeader; */
