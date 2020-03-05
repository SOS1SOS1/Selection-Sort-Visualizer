
/*
*** Selection Sort ***
-	Orders values repetitively putting a particular value into its
  final position
-	Find the smallest value in the list
-	Switch it with the value in the 1st position
-	Find the next smallest value
-	Switch it with the value in the 2nd position
-	Repeat until all values are sorted
*/

let numbers = new Array(20);  // numbers to be sorted
let sortedListLength = 0;
let currentIndex = 0;
let nextSmallestIndex = null;  // holds the next smallest number's index in the list
let sorted = true;  // true initially and once list is sorted
let sortNumbers = false;  // true once sort button is pressed

// buttons for sorting and generating new numbers
let newNumbersButton;
let sortButton;

// width and height of the canvas
let w = window.innerWidth;
let h = 550;

// centers the bars that represent the numbers in the array
let start_x = w/2 - Math.floor((numbers.length-1) * 17 / 2);

function setup() {
  createCanvas(w, h);

  // sets up numbers array with random numbers (1-100)
  for (let i = 0; i < numbers.length; i++) {
    numbers[i] = Math.ceil(Math.random() * 100);
  }
  console.log("Initial Numbers: " + numbers);

  // sets the frame rate, used to control the speed of the animation
  frameRate(30);
}

function getRandomNumbers(newNumbersButton_id, sizeInput_id) {
  var newNumbersButton = document.getElementById(newNumbersButton_id);
  newNumbersButton.style.opacity =  "0.5";

  if (sorted) {
    var size = document.getElementById(sizeInput_id).value;
    if (numbers.length != size && size != '' && size > 0) {
      numbers = Array(int(size));
      start_x = w/2 - Math.floor((numbers.length-1) * 17 / 2);
    }

    // sets up numbers array with random numbers (1-100)
    for (let i = 0; i < numbers.length; i++) {
      numbers[i] = Math.ceil(Math.random() * 100);
    }
    console.log("Initial Numbers: " + numbers);
  }
}

function doSort(sortButton_id, speedInput_id) {
  var sortButton = document.getElementById(sortButton_id);
  sortButton.style.opacity =  "0.5";

  var speed = document.getElementById(speedInput_id).value;
  if (speed != '' && speed >= 1) {
    frameRate(int(speed));
  }

  if (sorted) {
    sorted = false;
    sortNumbers = true;
    sortedListLength = 0;
    currentIndex = 0;
  }
}

function changeOpacity(id) {
    var element = document.getElementById(id);
    element.style.opacity =  "1";
}

function draw() {// background of canvas
  background(255);
  // line width
  strokeWeight(12);
  // rounds ends of lines
  strokeCap(SQUARE);

  for (let i = 0; i < numbers.length; i++) {
    if (i == currentIndex) {
      if (!sorted && sortNumbers) {
        // sets stroke color to light gray for numbers being compared
        stroke(130, 130, 130);
      } else {
        stroke(78, 162, 163);
      }
    } else {
      // sets stroke color to teal for numbers not being compared
      stroke(78, 162, 163);
    }

    let x = i * 17 + start_x;
    let length = numbers[i] * 5;
    line(x, 0, x, length);
  }

  if (!sorted && sortNumbers) {
    selectionSort();
  }
}

function selectionSort() {
  // finds the next smallest number's index
  if (numbers[currentIndex] <= numbers[nextSmallestIndex] || nextSmallestIndex == null) {
    nextSmallestIndex = currentIndex;
  }

  // if it reached the end of the list
  if (currentIndex == numbers.length-1) {
    // inserts the next smallest number into the sorted sublist
    let temp = numbers[nextSmallestIndex];
    numbers[nextSmallestIndex] = numbers[sortedListLength]
    numbers[sortedListLength] = temp;

    // resets next smallest index to null
    nextSmallestIndex = null;

    // increments the sorted list size and sets current index to that number
    sortedListLength++;
    currentIndex = sortedListLength;

    if (sortedListLength == numbers.length) {
      sorted = true;
    }
  } else {
    // increments the current index
    currentIndex++;
  }
}
