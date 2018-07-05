import React from 'react';
import s from './loader.scss';
import withStyles from "isomorphic-style-loader/lib/withStyles";

class Loader extends React.Component {
  render(){return (
    <div className={s["sk-fading-circle"]}>
      <div className={[s["sk-circle"],s["sk-circle1"]].join(' ')}></div>
      <div className={[s["sk-circle"],s["sk-circle2"]].join(' ')}></div>
      <div className={[s["sk-circle"],s["sk-circle3"]].join(' ')}></div>
      <div className={[s["sk-circle"],s["sk-circle4"]].join(' ')}></div>
      <div className={[s["sk-circle"],s["sk-circle5"]].join(' ')}></div>
      <div className={[s["sk-circle"],s["sk-circle6"]].join(' ')}></div>
      <div className={[s["sk-circle"],s["sk-circle7"]].join(' ')}></div>
      <div className={[s["sk-circle"],s["sk-circle8"]].join(' ')}></div>
      <div className={[s["sk-circle"],s["sk-circle9"]].join(' ')}></div>
      <div className={[s["sk-circle"],s["sk-circle10"]].join(' ')}></div>
      <div className={[s["sk-circle"],s["sk-circle11"]].join(' ')}></div>
      <div className={[s["sk-circle"],s["sk-circle12"]].join(' ')}></div>
    </div>
  )}
}

export default withStyles(s)(Loader);
