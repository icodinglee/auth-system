import React, { Component } from 'react';
import Header from './Header';

class AppNotFound extends Component {
  render() {
    let styles = {
      root: {
        minHeight: '20em',
        textAlign: 'center',
        paddingBottom: '5em',
      },
      img: {
        display: 'block',
        width: '10em',
        margin: '7em auto 3em',
      },
      p: {
        color: '#f44336',
        textAlign: 'center'
      }
    };
    return (
      <div>
        <Header />
        <div style={styles.root}>
          <p style={styles.p}>您访问的页面不存在哦！</p>
        </div>
      </div>
    );
  }
}

export default AppNotFound;