import React, { Component } from 'react';
import Radium from 'radium';

import Header from '../shared/Header';

class Home extends Component {
  getStyles() {
    return {
      content: {
        minHeight: '400px',
        fontSize: '1.6em',
        '@media(min-width: 600px)': {
          fontSize: '3em'
        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }
  }
  render() {
    const styles= this.getStyles();
    return (
      <div>
        <Header />
        <div style={styles.content}>平顶山人大履职服务平台</div>
      </div>
    );
  }
}

export default Radium(Home);
