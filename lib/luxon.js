'use strict';

var dayjs = require('dayjs');
var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
var weekday = require('dayjs/plugin/weekday')

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(weekday)

Luxon.prototype.plus = function(param) {

  var key = Object.keys(param)[0];
  var val = param[key];

  this.date = this.date.add(val, key.slice(0, -1));
  return this;
};

Luxon.prototype.minus = function(param) {

  var key = Object.keys(param)[0];
  var val = param[key];

  this.date = this.date.subtract(val, key.slice(0, -1));
  return this;
};

Luxon.prototype.endOf = function(param) {
  this.date = this.date.endOf(param);
  return this;
};

Luxon.prototype.startOf = function(param) {
  this.date = this.date.startOf(param);
  return this;
};

Luxon.prototype.set = function(param) {

  var key = Object.keys(param)[0];
  var val = param[key];
  
  if (key === 'weekday') {
    this.date = this.date.weekday(val);
  } else if(key === 'day') {
    this.date = this.date.date(val);
  } else {
    this.date = this.date.set(key, val);
  }

  return this;
};

Luxon.prototype.valueOf = function() {
  return this.date.valueOf();
};

Luxon.prototype.toUTC = function() {
  this.date = this.date.utc();
  return this;
};

Luxon.prototype.toISO = function() {
  return this.date.format('YYYY-MM-DDTHH:mm:ss.SSSZ');
};

Luxon.prototype.toString = function() {
  return this.date.format('YYYY-MM-DDTHH:mm:ss.SSSZ');
};

Luxon.prototype.toJSDate = function() {
  return this.date.toDate();
};

Luxon.prototype.setZone = function(tz) {
  this.date = this.date.tz(tz);
  return this;
};

function Luxon(date) {
  this.date = date;
  this.isValid = this.date.isValid();
  this.zoneName = dayjs.tz.guess();
  getter(this, 'millisecondd');
  getter(this, 'second');
  getter(this, 'minute');
  getter(this, 'hour');
  getter(this, 'day');
  getter(this, 'weekday');
  getter(this, 'month');
  getter(this, 'year');
}

function getter(object, name) {
  Object.defineProperty(object, name, {
    get: function() {
      return object.date[name]();
    }
  });
}

// console.log(dayjs().tz.guess());

module.exports = {
  DateTime: {
    local: function() {
      var date = dayjs();
      return new Luxon(date);
    },
    fromJSDate: function(jsdate, param) {
      var date = dayjs(jsdate).tz(param.zone);
      return new Luxon(date);
    },
    fromMillis: function(milliseconds, param) {
      var date = dayjs(milliseconds).tz(param.zone);
      return new Luxon(date);
    },
    fromISO: function(iso, param) {
      var date = dayjs(iso).tz(param.zone);
      return new Luxon(date);
    },
    fromRFC2822: function(rfc2822, param) {
      var date = dayjs(rfc2822).tz(param.zone);
      return new Luxon(date);
    },
    fromSQL: function(sql, param) {
      var date = dayjs(sql).tz(param.zone);
      return new Luxon(date);
    },
    fromFormat: function(str, param) {
      var date = dayjs(str, 'EEE, d MMM yyyy HH:mm:ss').tz(param.zone);
      return new Luxon(date);
    }
  }
};
