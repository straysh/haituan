import mongoose from "mongoose";
import OrderSchema from "../data/models/orders";
import * as Errors from './errors_constant';
import WE from './exception';
const Orders = mongoose.model('Orders', OrderSchema);

if (!Object.values) {
  Object.values = function values(O) {
    return reduce(keys(O), (v, k) => concat(v, typeof k === 'string' && isEnumerable(O, k) ? [O[k]] : []), []);
  };
}
function getDate(date = new Date()) {
  const yyyy = date.getUTCFullYear().toString();
  const mm = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // getMonth() is zero-based
  const dd = date.getUTCDate().toString().padStart(2, '0');
  const HH = date.getHours().toString().padStart(2, '0');
  const MM = date.getMinutes().toString().padStart(2, '0');
  let SS = date.getMilliseconds().toString().padStart(2, '0');
  SS = SS.padEnd(3,"0");

  let year = yyyy;
  let month = mm.padStart(2, '0');
  let day = dd.padStart(2, '0');
  let hour = HH.padStart(2, '0');
  let minute = MM.padStart(2, '0');
  let second = SS.padStart(3, '0');
  return `${year}-${month}-${day}|${hour}:${minute}:${second}Z`;
}

const log = function info(...args) {
  args.unshift(getDate());
  args.unshift(`[Info]`);
  console.log(...args); // eslint-disable-line no-console
  return true;
};
const tryErrors = function tryErrors(req, res, fn) {
  try {
    fn().catch(err => {
      if (err instanceof WE) {
        res.json(err.ToJSON());
      } else {
        console.error(err);
        res.json({
          info: 'unknown',
          status: -1,
          data: null,
        });
      }
    });
  } catch (err) {
    console.error(err);
    res.json({
      info: 'unknown',
      status: -1,
      data: null,
    });
  }
};

function parseItem(data) {
  for(let i=0;i<data.length;i++) {
    let item = data[i];
    if(item==="运单号" || item==="物流公司" || item==="收件人") {
      return null;
    }


  }
}
function parse(data) {
  const result = [];
  let username=null,order_sn=null,kuaidi=null;
  for (let i=0;i<data.length;i++) {
    let item = null, row = data[i], skip=false;
    for(let j=0;i===0&&j<row.length;j++) {
      let t = row[j];
      if(t === "收件人" || t==="收件人姓名") {
        username = j; skip=true;
      } else if(t==="运单号") {
        order_sn = j; skip=true;
      } else if(t==="物流公司" || t==="快递公司") {
        kuaidi = j; skip=true;
      }
    }
    if(username===null || order_sn===null || kuaidi===null) {
      throw new WE(Errors.NO_XLS_HEADER);
    }
    if(skip) continue

    item = {
      username: row[username],
      order_sn: row[order_sn],
      kuaidi:   row[kuaidi],
    };
    if(!item) continue;
    result.push(item);
  }

  return result;
}
function HomeController() { }

HomeController.xls = (req, res)=>{
  tryErrors(req, res, async () => {
    let raw = req.body.xls;
    if(raw === "") {
      log("xls is empty");
      throw new WE(Errors.XLS_EMPTY);
    }

    raw = JSON.parse(raw);
    raw = Object.keys(raw).map(function(key) {
      return raw[key];
    });
    const input = parse(raw[0] || []);
    await Orders.insertMany(input);


    return res.json({info: 'success', status: 10000, data: input});
  });

}

HomeController.search = (req, res) => {
  tryErrors(req, res, async ()=>{
    const q = req.body.q;
    if(/^\s*$/.test(q)) {
      throw new WE(Errors.EMPTY_SEARCH);
    }

    let data = await Orders.find({$or:[{username:q}, {order_sn:q}]}).sort({"_id":-1});
    res.json({status:10000,info:"success", data})
  })
};

export default HomeController;
