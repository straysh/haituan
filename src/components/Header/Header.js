/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import queryString from 'query-string';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import history from "../../history"
import { connect } from 'react-redux';

import s from './Header.css';
import Link from '../Link';
import Navigation from '../Navigation';
import logoUrl from './logo-small.png';
import logoUrl2x from './logo-small@2x.png';

class Header extends React.Component {

  _gotoTokens(e){
    e.preventDefault();
    e.stopPropagation();
    history.replace("/");
  }
  render() {
    return (
      <Navbar inverse collapseOnSelect >
        <Navbar.Header>
          <Navbar.Brand>
            <Link className={s.brand} to="/">
              <img src={logoUrl} width="32" height="32" alt="EchoWallet" className={s.App_logo}/>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight >
            <NavItem href="/tokens" onClick={this._gotoTokens}>燕子</NavItem>
            {/*<NavDropdown title={mapLocalesName()} id="language-you-choose">*/}
              {/*<MenuItem href="?lang=en-us">English</MenuItem>*/}
              {/*<MenuItem href="?lang=zh-cn">CN</MenuItem>*/}
            {/*</NavDropdown>*/}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withStyles(s)(Header);
