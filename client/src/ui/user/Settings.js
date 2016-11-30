import React, { Component } from 'react';
import Radium from 'radium';
import isEmpty from 'lodash/fp/isEmpty';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';

import cookie from 'react-cookie';
import { connect } from 'react-redux';
import { getUserProfile, editUserProfile } from '../../redux/actions/index';

import Header from '../shared/Header';
import Avatar from './Avatar';
import avatarURL from '../../assets/images/cat.jpg'

class Settings extends Component {
  componentWillMount() {
    const username = cookie.load('user').name
    this.props.getUserProfile(username);
  }

  handleSubmit(e) {
    e.preventDefault();
    const nickname = this.refs.nickname.getValue();
    const address = this.refs.address.getValue();
    const postalcode = this.refs.postalcode.getValue();
    const profileId = this.props.profile.id;
    this.props.editUserProfile(profileId, nickname, address, postalcode);
  }

  getStyles() {
    return {
      root: {
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '1em',
        display: 'flex'
      },
      sidebar: {
        width: '30%',
        minHeight: '400px'
      },
      content: {
        width: '70%'
      },
      textField: {
        display: 'block',
        width: '100%'
      },
      floatingLabel: {
        fontSize: '1.2em'
      },
    };
  }

  render() {
    let styles = this.getStyles();
    const {username, nickname, address, postalcode, message} = this.props.profile;
    let content = (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <TextField
          ref="nickname"
          defaultValue={nickname}
          style={styles.textField}
          floatingLabelText="昵称"
          floatingLabelStyle={styles.floatingLabel} />
        <TextField
          ref="address"
          defaultValue={address}
          style={styles.textField}
          floatingLabelText="通讯地址"
          floatingLabelStyle={styles.floatingLabel} />
        <TextField
          ref="postalcode"
          defaultValue={postalcode}
          style={styles.textField}
          floatingLabelText="邮政编码"
          floatingLabelStyle={styles.floatingLabel} />
        <RaisedButton
          style={styles.button}
          labelStyle={styles.label}
          type="submit"
          label="保存"
          secondary={true} />
      </form>
    )
    const {avatar_url} = this.props.profile
    return (
      <div>
        <Header />
        <div style={{textAlign: 'center'}}>
          <p>{ message ? message : ''}</p>
        </div>
        <div style={styles.root}>
          <div style={styles.sidebar}>
            <Avatar avatar={this.props.profile && avatar_url ? avatar_url : avatarURL} />
          </div>
          <div style={styles.content}>
            { !isEmpty(this.props.profile) ? content : ''}
          </div>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  profile: React.PropTypes.object,
  error: React.PropTypes.string,
  getUserProfile: React.PropTypes.func
}

const mapStateToProps = (state) => ({
  profile: state.user.profile,
  error: state.user.error
})

export default connect((mapStateToProps), {
  getUserProfile,
  editUserProfile
})(Radium(Settings));
