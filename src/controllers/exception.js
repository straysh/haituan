import _ from 'lodash';
import Errors from './errors';

export default function WE(code, message = null) {
  let errorCode = Number.parseInt(code, 10);
  if (_.isNaN(errorCode) || !_.isNumber(errorCode)) errorCode = 50001;
  if (Error.captureStackTrace) Error.captureStackTrace(this, this.constructor);

  this.code = parseInt(errorCode, 10);
  this.message = Errors[errorCode] || message || 'unknown';
  this.name = this.constructor.name;
}

WE.prototype.ToJSON = function() {
  return {
    info: this.message,
    status: this.code,
    data: null,
  };
};
