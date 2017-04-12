'use strict';

// Object containing starting wages for various 4 year degrees
var degreeSWage = require('./degreeSWage.json');
// File containing some of our utility functions (already written)
var util = require('./util.js');

//Array containing recognizable degreeSWage
var degrees = degreeSWage.degreenames;


//TODO: You need to write this function AND utilize it.
// bracketFromGPA(decimal GPA);
function bracketFromGPA(gpa) {
	// 4-3.5, 3.49 - 3.0, 2.99 - 2.5
	if(gpa < 2.5)
		return 0;
	else if(gpa >= 2.5 && gpa < 3)
		return 1;
	else if(gpa >= 3 && gpa < 3.5)
		return 2;
	else
		return 3;
}

// TODO: recruiter( Array of hireables )
function recruiter(internArr) {

	// Below is just to help show the syntax you need,
	// you'll need to process ALL of the hireables like this one and sort
	var index = 0;
	var iname = internArr[index].name;
	var idegr = internArr[index].degree;
	var igpa = internArr[index].gpa;
	var iexp = internArr[index].experiance;
	var iwage, ivalue, ibracket, imetric;

	//remove interns with gpa's under 2.5 and interns with unrecognizable degrees
	var i;
	var j;
	var ind = [];
	for(i = 0; i < internArr.length; i++){
		//record interns with gpa's under 2.5
		if(internArr[i].gpa < 2.5 && internArr[i].degree != "astrology"){
			ind.push(i);
			continue;
		}
		//record interns with unrecognizable degrees
		for(j = 0; j < degrees.length; j++){
			if(internArr[i].degree == degrees[j]){ break; }
			else if(j+1 == degrees.length){
				ind.push(i);
			}
		}
	}

	//remove recorded intenrs
	for(i = (ind.length - 1); i >= 0; i--){
		internArr.splice(ind[i], 1);
	}

	//bubble sort interns by gpa
	var flag = true;
	var temp;
	for(i = 1; (i <= internArr.length) && flag; i++){
		flag = false;
		for(j = 0; j < (internArr.length-1); j++){
			if(internArr[j+1].gpa > internArr[j].gpa){
				temp = internArr[j];
				internArr[j] = internArr[j+1];
				internArr[j+1] = temp;
				flag = true;
			}
		}
	}
	

	// Yep, you can use strings as an "index" (technically it's a property) in JavaScript
	idegr = idegr.toLowerCase();
	iwage = degreeSWage[idegr];

	// You should use these functions at some point
	ivalue = util.getValueFromWageAndExp( /*wage, full years of experiance*/ );
	ibracket = bracketFromGPA ( /*decimal GPA*/ );

	// Hmm... this doesn't seem to follow the spec - fix it
	imetric = ivalue + ibracket;

	// We really want to add our sorting number "metric" to objects (it really is this easy)
	//internArr[index].metric = imetric;

	// and then sort them all (it doesn't return anything, it modifies the array sent)
	//util.sortInternObjects( /*Array of hireables with "metric" as a property*/ );


	// Output
	// An array of HIREABLE 'intern objects' (in order of most valueable to least valueable)
	// with at least the properties "name", "metric", "degree"
	// You can come up with any number you want for "metric" as long as it corresponds to the spec
	// and people earlier in the array have equal or greater values for "metric" than
	// people further down.

	return internArr;
};

module.exports = {
	recruiter: recruiter,
	bracketFromGPA: bracketFromGPA
};
