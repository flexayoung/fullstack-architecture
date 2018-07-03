import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return [
          <li key="google">
            <a href="/auth/google">Login With Google</a>
          </li>,
          <li key="facebook">
            <a href="/auth/facebook">Login With Facebook</a>
          </li>
        ];
      default:
        return [
          <li key="payment" style={{ margin: '0 10px' }}>
            <Payments />
          </li>,
          <li key="credits">Credits: {this.props.auth.credits}</li>,

          <li key="logout">
            <a href="/api/logout">Logout</a>
          </li>
        ];
    }
  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            className="left brand-logo"
            to={this.props.auth ? '/surveys' : '/'}
          >
            Emaily
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
