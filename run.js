
var CronExpression = require('./lib/expression');
var CronDate = require('./lib/date');

var luxon1 = require('luxon')
// var dayjs = require('dayjs')
// console.log(dayjs().utc());

var luxon2 = require('./lib/luxon');
var a = luxon1.DateTime.local();
var b = luxon2.DateTime.local();

// console.log(a.toUTC().toString());
// console.log(b.toUTC().toString());

// console.log(a.setZone('America/New_York').toString());
// console.log(b.setZone('America/New_York').toString());

// var test = require('tap').test;
function test1() {

  try {
    var interval = CronExpression.parse('');
    // t.ok(interval, 'Interval parsed');

    var date = new CronDate();
    date.addMinute();

    var next = interval.next();

    // t.ok(next, 'Found next scheduled interval');
    // t.equal(next.getMinutes(), date.getMinutes(), 'Schedule matches');

    // t.end();
  } catch (err) {
    // t.ifError(err, 'Interval parse error');
    console.log(err);
  }
}

test1();
