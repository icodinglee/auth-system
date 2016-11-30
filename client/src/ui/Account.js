import React, { Component } from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import Radium from 'radium';

import cookie from 'react-cookie';
import { connect } from 'react-redux';
import { clearErrors, getUserProfile } from '../redux/actions/index';

import Header from './shared/Header';
import AppNotFound from './shared/AppNotFound';

class Account extends Component {
  componentWillMount() {
    const username = this.props.params.username;
    this.props.getUserProfile(username);
  }

  getStyles() {
    return {
      content: {
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '1em',
        fontSize: '1.5em',
        display: 'flex'
      },
      link: {
        textDecoration: 'none'
      },
      button: {
        width: '150px',
        height: '50px',
        display: 'block',
        margin: '40px auto'
      },
      label: {
        fontSize: '15px',
        fontWeight: '600',
        lineHeight: '50px'
      }
    }
  }

  render() {
    const styles= this.getStyles();
    const currentUserToken = cookie.load('token');
    const currentUser = cookie.load('user');
    const isOwner = this.props.profile && currentUserToken && (this.props.profile.id === currentUser.id);
    let editButton = '';
    if(isOwner) {
      editButton = (
        <Link to='/settings' style={styles.link}>
          <RaisedButton label="编辑个人信息" secondary={true} style={styles.button} labelStyle={styles.label} />
        </Link>
      );
    }
    if(this.props.error) {
      return <AppNotFound />
    } else {
      return (
        <div>
          <Header />
          <div style={styles.content}>
            <div>
              <p>用户名：{ this.props.profile.username }</p>
              <p>昵称： { this.props.profile.nickname }</p>
              <p>地址： { this.props.profile.address }</p>
              <p>邮编： { this.props.profile.postalcode }</p>
              { editButton }
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  profile: state.user.profile,
  error: state.user.error
})

export default connect((mapStateToProps), {
  clearErrors,
  getUserProfile
})(Radium(Account));
