/* eslint-disable import/prefer-default-export */
import { XLS_RESULT } from '../constants';

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
class XlsAction {

  uploadJson = (fetch, data)=> async (dispatch, getState) =>{
    const text = await fetch("/api/xls", {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify({xls: data}),
    });

    const result = await text.json();
  }

  searchOrder = (fetch, q)=> async (dispatch, getState) => {
    const text = await fetch("/api/search", {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify({q}),
    });

    let result = await text.json();
    result = result&&result.data ? result.data : [];
    const data = [];
    for(let i=0;i<result.length;i++) {
      let item=result[i];
      data.push({
        "收件人": item.username,
        "物流公司": item.kuaidi,
        "运单号": item.order_sn,
      });
    }
    dispatch({type: XLS_RESULT, payload:{data}});
  }
}

export default new XlsAction();
