import mongoose from "mongoose";
import XLSX from "xlsx";
import OrderSchema from "../data/models/orders";
import * as Errors from './errors_constant';
import WE from './exception';
const X = XLSX;
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

function parse(product_name, data) {
  const result = [];
  let username=null,order_sn=null,kuaidi=null;
  const header = data.shift();
  for(let i=0;i<header.length;i++) {
    let t = header[i];
    if(t === "收件人" || t==="收件人姓名") {
      username = i;
    } else if(t==="运单号" || t==="快递单号") {
      order_sn = i;
    } else if(t==="物流公司" || t==="快递公司") {
      kuaidi = i;
    }
  }

  if(username===null || order_sn===null) {
    throw new WE(Errors.NO_XLS_HEADER);
  }

  for (let i=0;i<data.length;i++) {
    let item = null, row = data[i];
    item = {
      product_name,
      username: row[username].trim(),
      order_sn: row[order_sn].trim(),
      kuaidi:   kuaidi!==null ? row[kuaidi] : "",
    };
    if(!item) continue;
    if(/\d+/.test(item.username)) continue;
    result.push(item);
  }

  return result;
}
function HomeController() { }

// {
//   file:[ {
//     fieldname: 'file',
//     originalname: '黄桃单号全.xlsx',
//     encoding: '7bit',
//     mimetype: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//     buffer: <Buffer ... >,
//     size: 197268
//   },
// ]}
HomeController.xls = (req, res)=>{
  tryErrors(req, res, async () => {
    const file = req.files.file[0];
    const buf = file.buffer;
    const filename = file.originalname;
    const product_name = req.body['product_name'];
    let workbook = X.read(buf, {type: 'buffer'});
    let raw = {};
    workbook.SheetNames.forEach(function(sheetName) {
      let roa = X.utils.sheet_to_json(workbook.Sheets[sheetName], {header:1});
      if(roa.length) raw[sheetName] = roa;
    });

    // console.log(raw);
    raw = Object.keys(raw).map(function(key) {
      return raw[key];
    });
    const input = parse(product_name, raw[0] || []);
    await Orders.insertMany(input);
    console.log(input[0]);

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
