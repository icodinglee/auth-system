import React, { Component } from 'react';

import cookie from 'react-cookie';
import { connect } from 'react-redux';
import { uploadImage } from '../../redux/actions/image-upload';

import axios from 'axios';

class Avatar extends Component {
  handleChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onload = () => {
      this.props.uploadImage(reader.result, file.name);
    };
    reader.readAsDataURL(file);
  }

  getStyles() {
    return {
      img: {
        width: '200px'
      },
      cameraIcon: {
        position: 'absolute',
        width: '80px',
        height: '30px',
        top: '20px',
        left: '30px',
        cursor: 'pointer',
        textAlign: 'center'
      },
      cameraInput: {
        position: 'absolute',
        opacity: '0',
        width: '100px',
        height: '30px',
        zIndex: '100',
        top: '20px',
        left: '30px',
        cursor: 'pointer'
      },
      div: {
        position: 'relative'
      }
    }
  }

  render() {
    let styles = this.getStyles();
    const {message, imageURL} = this.props.imageData;
    return (
      <div>
        { message ? <p>{message}</p> : ''}
        <img src={imageURL ? imageURL : this.props.avatar} style={styles.img} />
        <div style={styles.div}>
          <input type='file' id='avatarInput' onChange={this.handleChange.bind(this)} style={styles.cameraInput} />
          <div htmlFor='avatarInput' style={styles.cameraIcon}>更改头像</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  imageData: state.image.data
})

export default connect((mapStateToProps), {
  uploadImage
})(Avatar);
