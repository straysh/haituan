/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {ControlLabel, Form, FormControl, FormGroup} from "react-bootstrap";
import {connect} from "react-redux";
import FileUploadProgress  from 'react-fileupload-progress';

import s from './Upload.css';

const styles = {
  progressWrapper: {
    height: '50px',
    marginTop: '10px',
    width: '400px',
    float:'left',
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    WebkitBoxShadow: 'inset 0 1px 2px rgba(0,0,0,.1)',
    boxShadow: 'inset 0 1px 2px rgba(0,0,0,.1)'
  },
  progressBar: {
    float: 'left',
    width: '0',
    height: '100%',
    fontSize: '12px',
    lineHeight: '20px',
    color: '#fff',
    textAlign: 'center',
    backgroundColor: '#5cb85c',
    WebkitBoxShadow: 'inset 0 -1px 0 rgba(0,0,0,.15)',
    boxShadow: 'inset 0 -1px 0 rgba(0,0,0,.15)',
    WebkitTransition: 'width .6s ease',
    Otransition: 'width .6s ease',
    transition: 'width .6s ease'
  },
  cancelButton: {
    marginTop: '5px',
    WebkitAppearance: 'none',
    padding: 0,
    cursor: 'pointer',
    background: '0 0',
    border: 0,
    float: 'left',
    fontSize: '21px',
    fontWeight: 700,
    lineHeight: 1,
    color: '#000',
    textShadow: '0 1px 0 #fff',
    filter: 'alpha(opacity=20)',
    opacity: '.2'
  },

  bslabel: {
    display: 'inline-block',
    maxWidth: '100%',
    marginBottom: '5px',
    fontWeight: 700
  },

  bsHelp: {
    display: 'block',
    marginTop: '5px',
    marginBottom: '10px',
    color: '#737373'
  },

  bsButton: {
    fontSize: '12px',
    lineHeight: '1.5',
    borderRadius: '3px',
    color: '#fff',
    backgroundColor: '#337ab7',
    borderColor: '#2e6da4',
    display: 'inline-block',
    padding: '6px 12px',
    marginBottom: 0,
    fontWeight: 400,
    textAlign: 'center',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
    touchAction: 'manipulation',
    cursor: 'pointer',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
    userSelect: 'none',
    backgroundImage: 'none',
    border: '1px solid transparent'
  }
};
class Upload extends React.Component {
  static contextTypes = {
    fetch: PropTypes.func.isRequired,
  };
  state = {err:""}
  constructor(props){
    super(props)
  }

  submitForm(onSubmit, e){
    const pname = document.getElementById('product_name').value;
    if(/^$\s*/.test(pname)) {
      return false;
    }
    return onSubmit(e);
  }
  formGetter(){
    return new FormData(document.getElementById('customForm'));
  }
  customFormRenderer(onSubmit){
    return (
      <form id='customForm' style={{marginBottom: '15px'}} >
        <label style={styles.bslabel} htmlFor="product_name">商品名称</label>
        <input style={{display: 'block'}} type="text" name='product_name' id="product_name" />
        <label style={styles.bslabel} htmlFor="xls">xls文件</label>
        <input style={{display: 'block', marginBottom:'0.5em'}} type="file" name='file' id="xls" />
        <button type="button" style={styles.bsButton} onClick={this.submitForm.bind(this, onSubmit)}>Upload</button>
      </form>
    );
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <FileUploadProgress key='ex1' url='/api/xls'
            onProgress={(e, request, progress) => {console.log('progress', e, request, progress);}}
            onLoad={ (e, request) => {console.log('load', e, request);}}
            onError={ (e, request) => {console.log('error', e, request);this.setState({err:e});}}
            onAbort={ (e, request) => {console.log('abort', e, request);this.setState({err:e});}}
            formGetter={this.formGetter.bind(this)}
            formRenderer={this.customFormRenderer.bind(this)}
          />
          {
            this.state.err &&
            <div>
              <pre>{this.state.err.toString()}</pre>
            </div>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  xls: state.xls,
});

const mapDispatchToProps = dispatch => {
  return {
    uploadJson: (...args)=>{
      dispatch(XLS.uploadJson(...args))
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)( withStyles(s)(Upload) );
