import React, { Component } from 'react';
import isEmpty from 'lodash/fp/isEmpty';
import map from 'lodash/fp/map';
import values from 'lodash/fp/values';

class AuthErrors extends Component {
  getStyles() {
    return {
      root: {
        borderLeft: '3px solid #f44336',
        backgroundColor: '#fcf8f2',
        width: '256px',
        padding: '20px',
        marginBottom: '15px'
      },
      error: {
        fontSize: 14,
        lineHeight: '18px',
        color: '#f44336',
        textAlign: 'left'
      }
    };
  }

  render() {
    let styles = this.getStyles();

    if (this.props.error !== '') {
      return (
        <div style={styles.root}>
          <div style={styles.error}>
            { this.props.error}
          </div>
        </div>
      );
    } else {
      return <span />
    }
  }
}

AuthErrors.propTypes = {
  error: React.PropTypes.string
};

export default AuthErrors;
