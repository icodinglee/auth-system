import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router'
import cookie from 'react-cookie';
import Radium from 'radium';

import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/index';

class Header extends Component {
  handClick(e) {
    this.props.logoutUser();
  }
  render() {
    let styles = {
      root: {
        backgroundColor: '#00bcd4',
        padding: '1em'
      },
      container: {
        maxWidth: '1000px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      },
      nav: {
        color: 'white',
        lineHeight: 2,
        paddingTop: '0.5em',
        paddingBottom: '0.5em',
        paddingRight: '1.3em',
        opacity: '.8',
        transition: 'all 0.5s ease',
        fontWeight: '600',
        fontSize: '1.2em',
        textDecoration: 'none',
        ':hover': {
          cursor: 'pointer'
        }
      }
    };
    const RadiumLink = Radium(Link);

    let isLogin = cookie.load('token') ? true : this.props.authenticated;
    let authActions;
    if(isLogin) {
      authActions = (<div style={[styles.nav, {paddingRight: 0}]} onClick={this.handClick.bind(this)}>退出</div>);
    } else {
      authActions = (
        <div>
          <Link to='/signup' style={styles.nav}>注册</Link>
          <RadiumLink to='/login' style={[styles.nav, {paddingRight: 0}]}>登录</RadiumLink>
        </div>
      );
    }
    return (
      <div style={[styles.root, this.props.style]}>
        <div style={styles.container}>
          <div>
            <IndexLink to='/' style={styles.nav}>首页</IndexLink>
            { isLogin ? <Link to={`/${cookie.load('user').name}`} style={styles.nav}>个人主页</Link> : '' }
          </div>
          { authActions }
        </div>
      </div>
    );
  }
}

Header.contextTypes = {
  router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated
})

export default connect((mapStateToProps), {
  logoutUser
})(Radium(Header));
