import React, { Component } from 'react';

class Footer extends Component {
  getStyles() {
    return {
      footer: {
        backgroundColor: '#212121',
        textAlign: 'center',
        padding: '48px 24px',
        color: 'rgba(255, 255, 255, 0.54)',
        fontSize: '1.2em'
      }
    }
  }
  render() {
    const styles = this.getStyles();
    return (
      <div style={styles.footer}>footer</div>
    );
  }
}

export default Footer;