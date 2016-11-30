import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Radium from 'radium';
import isEmpty from 'lodash/fp/isEmpty';
import {Link} from 'react-router';
import cookie from 'react-cookie';

import Header from '../shared/Header';
import AuthErrors from './AuthErrors';

import { connect } from 'react-redux';
import { clearErrors, loginUser } from '../../redux/actions/index';

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }

  componentWillMount() {
    if(this.props.authenticated || cookie.load('token')) {
      this.context.router.push('/');
    }
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.clearErrors();

    let username = this.refs.username.getValue();
    let password = this.refs.password.getValue();

    let errors = {};
    let reUser = /^\w+$/;

    if (!username || !reUser.test(username)) {
      this.setState({error: '亲，你的用户名格式错误哦 :('});
      return;
    }
    if (!password || (password.length < 6)) {
      this.setState({error: '亲，您的密码太短了 :('});
      return;
    }

    this.props.loginUser({ username, password });
  }

  getStyles() {
    return {
      root: {
        textAlign: 'center',
        padding: '1em 2em 3em',
        '@media (min-width: 500px)': {
          width: '500px',
          margin: '0 auto'
        }
      },
      form: {
        margin: '0 auto'
      },
      textField: {
        display: 'block',
        width: '100%'
      },
      floatingLabel: {
        fontSize: '1.2em'
      },
      label: {
        fontWeight: '600',
        fontSize: '1.3em',
        lineHeight: '50px'
      },
      button: {
        width: '200px',
        height: '50px',
        marginTop: '50px',
        marginBottom: '15px'
      },
      a: {
        textDecoration: 'none',
        color: 'gray',
        ':hover': {color: '#00bcd4'}
      }
    };
  }

  render() {
    let styles = this.getStyles();
    const RadiumLink = Radium(Link);

    const loginError = this.props.loginError;
    return (
      <div>
        <Header />
        <div style={styles.root}>
          <form onSubmit={this.handleSubmit.bind(this)} style={styles.form}>
            <AuthErrors error={loginError !== '' ? loginError : this.state.error} />
            <TextField
              ref="username"
              style={styles.textField}
              floatingLabelText="用户名"
              floatingLabelStyle={styles.floatingLabel} />

            <TextField
              ref="password"
              style={styles.textField}
              floatingLabelText="密码"
              floatingLabelStyle={styles.floatingLabel}
              type="password" />

            <RaisedButton
              style={styles.button}
              labelStyle={styles.label}
              type="submit"
              label="登录"
              secondary={true} />
          </form>
          <RadiumLink to="/signup" style={styles.a}>没有账号？请注册</RadiumLink>
        </div>
      </div>
    );
  }
}

LogIn.contextTypes = {
  router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
  loginError: state.auth.loginError
})

export default connect((mapStateToProps), {
  clearErrors,
  loginUser
})(Radium(LogIn));
