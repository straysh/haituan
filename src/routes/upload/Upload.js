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
import XLSX from 'xlsx';

import s from './Upload.css';
import {XLS} from '../../actions';

let X = XLSX;
class Upload extends React.Component {
  static contextTypes = {
    fetch: PropTypes.func.isRequired,
  };
  state = {output:null}
  constructor(props){
    super(props)
    this._onChange = this._onChange.bind(this)
    this.do_file = this.do_file.bind(this)
  }

  _onChange(e){
    console.log(this);
    let files = e.target.files;
    if (!files || files.length === 0) return;
    this.do_file(files);
  }
  do_file(files) {
    let f = files[0];
    let reader = new FileReader();
    reader.onload = (e)=>{
      let data = e.target.result;
      data = new Uint8Array(data);
      this.process_wb(X.read(data, {type: 'array'}));
    };
    reader.readAsArrayBuffer(f);
  }
  process_wb(wb) {
    let output = this.to_json(wb)
    this.setState({output});
    this.props.uploadJson(this.context.fetch, output);
  }
  to_json(workbook) {
    let result = {};
    workbook.SheetNames.forEach(function(sheetName) {
      let roa = X.utils.sheet_to_json(workbook.Sheets[sheetName], {header:1});
      if(roa.length) result[sheetName] = roa;
    });
    return JSON.stringify(result, null, 2);
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Form>
            <FormGroup controlId="file">
              <ControlLabel><a href="/">查询订单</a></ControlLabel>
              <FormControl
                type="file"
                name="file"
                onChange={this._onChange}
              />
            </FormGroup>
            <div>
              <pre>{this.state.output}</pre>
            </div>
          </Form>
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
