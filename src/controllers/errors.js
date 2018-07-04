import * as Constant from './errors_constant';

const errors = {};
errors[Constant.FAILS] = 'whoops';
errors[Constant.XLS_EMPTY] = 'empty xls';
errors[Constant.NO_XLS_HEADER] = 'missing xls header';
errors[Constant.EMPTY_SEARCH] = 'empty search string';


export default errors;
