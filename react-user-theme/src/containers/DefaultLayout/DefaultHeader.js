/* eslint-disable import/no-extraneous-dependencies , no-unused-vars , class-methods-use-this */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
// import sygnet from '../../assets/img/brand/sygnet.svg';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  constructor() {
    super();

    this.logout = this.logout.bind(this);
  }

  logout() {
    localStorage.clear();
    window.location.href = '/login';
  }

  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <div className="d-flex">
          <AppNavbarBrand
            full={{ width: 89, height: 25, alt: 'CoreUI Logo' }}
            minimized={{
              width: 30, height: 30, alt: 'CoreUI Logo',
            }}
          />
          <AppSidebarToggler className="d-md-down-none" display="lg" />
        </div>
        <a href="#" onClick={this.logout} className="mr-3">Logout</a>

        {/* <AppAsideToggler className="d-lg-none" mobile /> */}
      </>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
