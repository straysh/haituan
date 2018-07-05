/* eslint-disable import/prefer-default-export */
import { XLS_RESULT, XLS_UPLOADING } from '../constants';

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
class XlsAction {

  showLoading = ()=>async(dispatch) => {
    dispatch({type: XLS_UPLOADING, payload:{isLoading: true}});
  }
  hideLoading = ()=>async(dispatch) => {
    dispatch({type: XLS_UPLOADING, payload:{isLoading: false}});
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
        "商品名": item.product_name.trim(),
        "收件人": item.username.trim(),
        "物流公司": item.kuaidi.trim(),
        "运单号": item.order_sn.trim(),
      });
    }
    dispatch({type: XLS_RESULT, payload:{data}});
  }
}

export default new XlsAction();
