import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Radium from 'radium';
import { Link } from 'react-router';
import cookie from 'react-cookie';

import { connect } from 'react-redux';
import { clearErrors, registerUser } from '../../redux/actions/index';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      nickname: '',
      password: '',
      confirmPassword: ''
    };
  }

  componentWillMount() {
    if(this.props.authenticated || cookie.load('token')) {
      this.context.router.push('/');
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    let username = this.refs.username.getValue();
    let nickname = this.refs.nickname.getValue();
    let password = this.refs.password.getValue();
    let confirmPassword = this.refs.confirmPassword.getValue();

    let error = false;
    let reUser = /^\w+$/;

    if (!username || !reUser.test(username)) {
      error = true;
      this.setState({username: "用户名为空或格式不正确"});
    }

    if (!nickname) {
      error = true;
      this.setState({nickname: "昵称不能为空"});
    }

    if (!password || (password.length < 6)) {
      error = true;
      this.setState({password: "密码为空或长度少于6个字符"});
    }

    if (confirmPassword !== password) {
      error = true;
      this.setState({confirmPassword: "密码不匹配"});
    }
    if(error) return;

    this.props.registerUser({ username, nickname, password });
  }

  handleFloatingErrorInputChange(textField) {
    switch(textField){
      case 'username':
        this.setState({username: ''});
        this.props.clearErrors();
        break;
      case 'nickname':
        this.setState({nickname: ''});
        this.props.clearErrors();
        break;
      case 'password':
        this.setState({password: ''});
        break;
      case 'confirmPassword':
        this.setState({confirmPassword: ''});
        break;
    }
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
      hint: {
        fontSize: '.9em'
      },
      label: {
        fontWeight: '600',
        fontSize: '1.3em',
        lineHeight: '50px'
      },
      button: {
        height: '50px',
        width: '200px',
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
    const registerError = this.props.registerError;
    return (
      <div style={styles.root}>
        <form onSubmit={ this.handleSubmit.bind(this) } style={styles.form}>
          <TextField
            ref="username"
            style={styles.textField}
            hintText="只允许数字、大小写字母和下划线"
            hintStyle={styles.hint}
            errorText={registerError !== '' ? registerError : this.state.username}
            floatingLabelText="用户名"
            floatingLabelStyle={styles.floatingLabel}
            onChange={this.handleFloatingErrorInputChange.bind(this, "username")} />

          <TextField
            ref="nickname"
            style={styles.textField}
            hintText="昵称"
            hintStyle={styles.hint}
            errorText={registerError !== '' ? registerError : this.state.nickname}
            floatingLabelText="昵称"
            floatingLabelStyle={styles.floatingLabel}
            onChange={this.handleFloatingErrorInputChange.bind(this, "nickname")} />

          <TextField
            ref="password"
            style={styles.textField}
            hintText="密码长度不能少于6个字符"
            hintStyle={styles.hint}
            errorText={this.state.password}
            floatingLabelText="密码"
            floatingLabelStyle={styles.floatingLabel}
            onChange={this.handleFloatingErrorInputChange.bind(this, "password")}
            type="password" />

          <TextField
            ref="confirmPassword"
            style={styles.textField}
            errorText={this.state.confirmPassword}
            floatingLabelText="确认密码"
            floatingLabelStyle={styles.floatingLabel}
            onChange={this.handleFloatingErrorInputChange.bind(this, "confirmPassword")}
            type="password" />

          <RaisedButton
            style={styles.button}
            labelStyle={styles.label}
            type="submit"
            label="注册"
            secondary={true} />
        </form>
        <RadiumLink to="/login" style={styles.a}>已有账号？请登录</RadiumLink>
      </div>
    );
  }
}

SignUpForm.contextTypes = {
  router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
  registerError: state.auth.registerError
})

export default connect((mapStateToProps), {
  clearErrors,
  registerUser
})(Radium(SignUpForm));
