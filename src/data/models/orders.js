import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/haituan', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const OrderSchema = mongoose.Schema({
  username: String,
  kuaidi:  String,
  order_sn: String,
  product_name: String,
});

OrderSchema.methods.Search = ()=>{
  return "Search";
};

export default OrderSchema;
