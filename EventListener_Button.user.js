var myButton = document.querySelectorAll('button#testButton')[0];

//store and define the function
var myCallback = function() {
  console.log('button clicked!');
};

myButton.addEventListener('click', myCallback);


// The callback can be removed, since we have a reference.

myButton.removeEventListener('click', myCallback)
