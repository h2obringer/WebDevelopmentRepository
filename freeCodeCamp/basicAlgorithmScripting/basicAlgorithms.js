/*
	Author: Randal Obringer
	Date: 12 June 2017
	Desciption: Solve basic algorithm problems for FreeCodeCamp
*/

//reverse a string
function reverseString(str) {
  return str.split("").reverse().join("");
}

//Return the factorial of a provided integer
function factorialize(num) {
  if(num==1||num===0){
    return 1;
  }
  return num*factorialize(num-1);
}

//a palindrome is a word or sentence that's spelled the same way both forward and backward,
//	ignoring punctuation, case, and spacing. Tell whether a word/sentence is a palindrome or 
//	not.
function removeSpecial(str){
	var temp = str.match(/[a-zA-Z0-9]+/gi);
	return temp.join("").toLowerCase();
}

function palindrome(str){
	var temp = removeSpecial(str);
  
	if(temp.length===null){
		return true;
	}
  
	var i=0;
	var j=temp.length-1;
	var status=true;
  
	while(status){
		if(i>=j){
			break;
		}else if(temp[i]==temp[j]){
			i++;
			j--;
		}else{
			status=false;
			break;
		}
	}
  
	return status;
}

//Return the length of the longest word in the provided sentence. Parameter is a string.
//Can easily add the removeSpecial() function with slight modifications if needed but this passed.
function findLongestWord(str) {
	var temp = str.split(" ");
	var count = 0;
	var word = "";
	for(var i=0;i<temp.length;i++){
		if(temp[i].length>count){
			count=temp[i].length;
			word=temp[i];
		}
	}
	return count;
}

//return the prvided string with the first letter of each word capitalized. The rest of the word should be lower case.
function titleCase(str) {
	var temp = str.split(" ");
	for(var i=0;i<temp.length;i++){
		temp[i]=temp[i].charAt(0).toUpperCase() + temp[i].substring(1).toLowerCase();
	}
	return temp.join(" ");
}

//return an array consisting of the argest number from each provided sub-array. 
function largestOfFour(arr) {
	var answerArray = [];
	for(var i=0;i<arr.length;i++){
		var localMax = -1;
		for(var j=0;j<arr[i].length;j++){
			if(arr[i][j]>localMax){
				localMax=arr[i][j];
			}
		}
		answerArray.push(localMax);
	}
  
	return answerArray;
}

//check if a string ends with the given target string and return true if it does and false if it doesn't.
//	This can be solved with the .endsWith() function from ES2015 but it is requested to solve this without it.
function confirmEnding(str, target) {
	for(var i=0;i<str.length;i++){
		if(target===str.substring(i)){
			return true;
		}
	}
	return false;
}

//repeat a given string (first argument, num times (second argument). Return an empty string if num is not a positive
//	number.
function repeatStringNumTimes(str, num) {
	var temp="";
  
	if(num>0){
		for(var i=0;i<num;i++){
			temp+=str;
		}
	}
	return temp;
}

//Truncate a string (first argument) if it is longer than the given maximum string length (second argument). Return the 
//	truncated string with a ... ending. Note that inserting the three dots to the end will add to the string length.
//	However, if the given maximum string length num is less than or equal to 3, then the addition of the three dots does 
//	not add to the string length in determining the truncated string.
function truncateString(str, num) {
	var answer="";
	if(num<=3){
		answer=str.slice(0,num)+"...";
	}else if(str.length<=num){ //if the max length is longer than the string then just return the string
		answer=str;
	}else{
		answer=str.slice(0,num-3)+"...";
	}
	
	return answer;
}

//split an array (first argument) into groups of size (second argument) and return them as a two-dimensional array.
function chunkArrayInGroups(arr, size) {
	var parent = [];
	var child = [];
	var j=0;
	for(var i=0;i<arr.length;i++){
		if(j==size){ //not -1
			j=0;
			parent.push(child);
			child=[];
		}
		child.push(arr[i]);
		j++;
	}
  
	if(child!==[]){ //push to the parent any leftovers
		parent.push(child);
	}
	return parent;
}

//return the remaining elements of an array after chopping off n elements from the front
function slasher(arr, howMany) {
	if(arr.length<=howMany){
		return [];
	}
  
	var answer=arr.slice(howMany);
  
	return answer;
}

//return true if the string in the first element of the array contains all of the letters
//	of the string in the second element of the array.
function mutation(arr) {
	arr[0]=arr[0].toLowerCase(); //change both to lowercase so we can match them accurately
	arr[1]=arr[1].toLowerCase();
	for(var i=0;i<arr[1].length;i++){
		if(arr[0].indexOf(arr[1][i])==-1){ //if it doesn't exist then fail 
			return false;
		}
	}
	return true;
}

//return the array after removing false, null, 0, "", undefined, and NaN
function bouncer(arr){
	var answer = arr.filter(function(item){
		if(typeof(item)==='string' && item.match(/[a-zA-Z]+/gi)){
			return true;
		}else if(item==="" || item===undefined || item===0 || item===false || item===null || isNaN(item)){
			return false;
		}
		return true;
	});

	return answer;
}

//provided an initial array (first argument), followed by one or more arguments: 
//	remove all elements from the initial array that are of the same value as the follow
//	on arguments.
function toBeDestroyed(item, toCompare){ //filter function
	if(item===toCompare){
		return false;
	}
	return true;
}

function destroyer() {
	var answer = arguments[0];
	var destroy = [];
	
	//arguments need to be preserved here or you will lose access to them where we need them	
	for(var i=1;i<arguments.length;i++){ 
		destroy.push(arguments[i]);
	}
  
	for(var j=0;j<destroy.length;j++){
		answer = answer.filter(function(item){
			return toBeDestroyed(item, destroy[j]);
		});
	}
  
	return answer;
}

//return the lowest index # at which a value (second argument) should be inserted into an array
//	(first argument) after the array has been sorted smallest to largest.
function getIndexToIns(arr, num) {
	var myArray = arr.sort(function(a,b){ //sort from small to large
		return a-b;
	});
  
	//if num is larger than biggest value in array then it belongs last.
	//  there is no need to do further computations
	if(num>myArray[myArray.length-1]){
		return myArray.length;
	}
  
	var index = -1;
	for(var i=0;i<myArray.length;i++){
		index = i;
		if(num<=myArray[i]){
			break;
		}
	}
  
	return index;
}

//write a function which takes a ROT13 encoded string as input and returns a decoded string.
//	ROT13 of an original string shifts characters to the right by 13. A becomes N and B becomes O, etc.
//	All letters will be uppercase. Do not transform any non-alphabetic character, just pass them.
function rot13(str) { // LBH QVQ VG! (YOU DID IT!)
	var answer = "";
	for(var i=0;i<str.length;i++){
		if(str.charAt(i).match(/[A-Z]/gi)){
			var temp = str.charCodeAt(i)-13;
      
			//if letter gets translated below A we need to add 26
			if(temp<65){ 
				temp+=26; //there are 26 letters in the alphabet
			}
      
			answer+=String.fromCharCode(temp);
      
		}else{
			answer+=str.charAt(i);
		}
	}
  
	return answer;
}
