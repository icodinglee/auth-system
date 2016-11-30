// 普通用户登录界面
import React, { Component } from 'react';

import SignUpForm from './SignUpForm';
import Header from '../shared/Header';

class SignUp extends Component {
  render() {
    return (
      <div>
        <Header />
        <SignUpForm />
      </div>
    );
  }
}

export default SignUp;