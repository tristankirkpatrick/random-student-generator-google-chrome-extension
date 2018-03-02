document.documentElement.style.height = '100%';
document.body.style.height = '100%';
document.documentElement.style.width = '100%';
document.body.style.width = '100%';

var div = document.createElement( 'div' );

//append all elements
document.body.appendChild( div );
//set attributes for div
div.id = 'myDivId';
div.style.position = 'absolute';
div.style.top = '145px';
div.style.right = '0px';
div.style.width = '70px';
div.style.height = '70px';
div.style.backgroundImage = "url(" + chrome.extension.getURL("icons/icon128.png") + ")" ;
div.style.backgroundSize = "100%";
