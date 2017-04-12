'use strict';

var test = require('tape');
// Object containing the interns we want to evaluate
var potentialHires = require('./input/groupOne.json');
var interns = potentialHires.interns;

var recruiter = require('../recruiter.js');
var util = require('../util.js');

test('util.getValueFromWageAndExp', function(t) {
  t.ok(util.getValueFromWageAndExp(31, 1) > util.getValueFromWageAndExp(30, 1), 'factors in wage');

  if (util.getValueFromWageAndExp(30, 1) > util.getValueFromWageAndExp(30, 0)) {
  	t.pass('factors in experiance');
  } else {
  	t.fail('does not factor in experiance');
  }

  t.equal(util.getValueFromWageAndExp(34, 1.3), false,
  	"getValueFromWageAndExp catches a partial year input and returns false");

  t.end();
});

test('util.sortInternObjects', function(t) {
	var inputArr = [interns[0], interns[1], interns[2], interns[3]];
	inputArr[0].metric = 3;
	inputArr[1].metric = 1;
	inputArr[2].metric = 2;
	inputArr[3].metric = 0;

	// Lets get the input sorted manually, in the expected array
	var expectedArr = inputArr.slice();
	expectedArr = [
		expectedArr[0], // 3
		expectedArr[2], // 2
		expectedArr[1], // 1
		expectedArr[3]  // 0
	];

	// Lets make a copy of the input to sort with the function
	var actualArr = inputArr.slice();

	// Sort by reference (in-place)
	util.sortInternObjects(actualArr);

  t.deepEqual(actualArr, expectedArr, 'bascially sorts by metric');

  // Let's throw a wrench in it and change our metrics
  actualArr[0].metric = 0;
  inputArr[0].metric = 0;

  expectedArr = [
		inputArr[2], // 2
		inputArr[1], // 1
		inputArr[0], // 0
		inputArr[3]  // 0
	];

	util.sortInternObjects(actualArr);

	t.deepEqual(actualArr, expectedArr, 'preserves order of same-metric objects');

  t.end();
});

// Your tests go here  (methods reference: https://www.npmjs.com/package/tape#testname-opts-cb )

test('bracketFromGPA', function(t){

  t.deepEqual(recruiter.bracketFromGPA(3.5), 3, "returns bracket three");
  t.deepEqual(recruiter.bracketFromGPA(3.4), 2, "returns bracket two");
  t.deepEqual(recruiter.bracketFromGPA(2.99), 1, "returns bracket one");
  t.deepEqual(recruiter.bracketFromGPA(2.49), 0, "returns bracket zero (unhirable)");

  t.end();
});

test('recruiter function', function(t){
  t.comment("Don't hire people with degree we don't recognize");
  var collArr = [
    interns[0],
    interns[1],
    interns[2]
  ];

  var inputArr = collArr.slice();
  inputArr[0].degree = "waffle maker";
  inputArr[2].degree = "";

  var retArr = [];
  retArr = recruiter.recruiter(inputArr);

  t.deepEqual(retArr.length, 1, "returns expected number of interns");
  t.deepEqual(retArr[0].degree, "dance", "returns the accepted degree");

  t.end();
});

test('recruiter function', function(t){
  t.comment("sort interns by GPA bracket");
  var collArr = [
    interns[13],
    interns[14],
    interns[15],
    interns[16]
  ];

  var inputArr = collArr.slice();
  inputArr[0].experience = 0;
  inputArr[0].degree = "human resources management";
  inputArr[3].expereince = 0;
  inputArr[3].degree = "human resources management";

  t.ok(inputArr[0].gpa === 3.1 &&
    inputArr[1].gpa === 2.07 &&
    inputArr[2].gpa === 2.32 &&
    inputArr[3].gpa === 3.93, "test input is as expected");

    var retArr = [];
    retArr = recruiter.recruiter(inputArr);

    t.deepEqual(retArr.length, 2, "Returns expected number of interns, removes GPAs below 2.5");
    t.deepEqual(retArr[0].gpa, 3.93, "Returns expected GPA order");


    t.end();
});

test('recruiter function', function(t){
  t.comment("Always consider interns with astrology degree");

  var collArr = [
    interns[0],
    interns[1],
    interns[2],
    interns[3],
  ];

  var inputArr = collArr.slice();
  inputArr[0].degree = "astrology";
  inputArr[0].gpa = 2.2;
  inputArr[2].degree = "astrology";

  var retArr = [];
  retArr = recruiter.recruiter(inputArr);

  t.deepEqual(retArr.length, 4, "Returns expected number of interns, given astrology majors with below 2.5 gpa");

  t.end();
});



// test('Test Name', function(t) {

//   if (/*some condition*/) {
//   	t.pass('passes condition');
//   } else {
//   	t.fail('does not pass condition');
//   }

// and/or an actual comparison like t.equal();

//   t.end();
// });
