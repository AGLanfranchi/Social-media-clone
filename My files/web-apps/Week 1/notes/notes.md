# Web Apps Week 1 - Notes

## Using the Fetch API - ES6

```javascript
fetch(url)
	// Return the response JSON
	.then(response => response.json())
	// Do something with the data
  .then(data => console.log(data))

// ... is equivalent to this ES5 version ...

fetch(url).then(function(repsonse) {
	return response.json();
})
.then(function(data) {
	console.log(data);
})
```

From MDN Web Docs:

[https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch](https://www.w3schools.com/Js/js_arrow_function.asp)

```javascript
fetch('http://example.com/movies.json')
  .then(response => response.json())
  .then(data => console.log(data));
```

> The simplest use of fetch() takes one argument — the path to the resource you want to fetch — and does not directly return the JSON response body but instead returns a promise that resolves with a Response object.

> The Response object, in turn, does not directly contain the actual JSON response body but is instead a representation of the entire HTTP response. So, to extract the JSON body content from the Response object, we use the json() method, which returns a second promise that resolves with the result of parsing the response body text as JSON.


## Arrow functions

Arrow functions are part of ES6 (the latest version of Javascript) and allow you to write functions in a shorter style (see the fetch API example at the top of the page for a comparison).

[https://www.w3schools.com/Js/js_arrow_function.asp](https://www.w3schools.com/Js/js_arrow_function.asp)

> If the function has only one statement, and the statement returns a value, you can remove the brackets and the return keyword.


## Promises

A promise represents the eventual completion or failure of an asynchronous operation (for example, a call to an API via `fetch`).

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)

## ASync functions

[https://javascript.info/async-await](https://www.w3schools.com/Js/js_arrow_function.asp)

> The word "async" before a function means that the function should returns a promise. Other values returned are wrapped in a resolved promise automatically.

* ASync functions can only be called from other Async functions
* `await` causes execution of the statement following to wait until the promise is resolved

