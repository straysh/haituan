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

import s from './Home.css';
import {XLS} from '../../actions';
import SubmitGroup from "./SubmitGroup";

class Home extends React.Component {
  static contextTypes = {
    fetch: PropTypes.func.isRequired,
  };
  state = {q:""}
  constructor(props){
    super(props);
    this._onChange = this._onChange.bind(this);
    this._submitHandle = this._submitHandle.bind(this);
  }

  _onChange(e){
    this.setState({q: e.target.value});
  }
  async _submitHandle(){
    this.props.searchOrder(this.context.fetch, this.state.q);
  }
  render() {
    const {xls} = this.props;
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Form>
            <FormGroup controlId="file" method="POST">
              {/*<ControlLabel><a href="/upload">上传Excel</a></ControlLabel>*/}
              <FormControl
                type="text"
                name="q"
                onChange={this._onChange}
                vlaue={this.state.q}
              />
              <SubmitGroup
                block
                title="查询"
                onSubmit={this._submitHandle}
              />
            </FormGroup>
            <div>
              <pre>{JSON.stringify(xls.data || [], null, 2)}</pre>
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
    searchOrder: (...args)=>{
      dispatch(XLS.searchOrder(...args))
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)( withStyles(s)(Home) );
