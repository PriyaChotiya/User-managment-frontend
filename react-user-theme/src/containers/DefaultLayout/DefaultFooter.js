/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <>
        <span>
          <a href="https://coreui.io">CoreUI</a>
          {' '}
&copy; 2019 creativeLabs.
        </span>
        <span className="ml-auto">
Powered by
          <a href="https://coreui.io/react">CoreUI for React</a>
        </span>
      </>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
