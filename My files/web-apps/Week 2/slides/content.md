class: middle, title-page

# Web Apps - CC006005-20

## Web Theory

### Gary Renes

---

# What theory are we talking about?

Mostly parts of the HTTP specification:

* Requests
* Methods (GET / POST / PATCH / DELETE)
* Responses
* Status Codes

and some others things:

* REST
* Cookies / Sessions
* AJAX Requests

---

# HTTP/1.0

HTTP/1.0 (or Hypertext Transfer Protocol v1.0) is an application protocol defined in RFC1945 (https://tools.ietf.org/html/rfc1945)

> The Hypertext Transfer Protocol (HTTP) is an application-level
protocol with the lightness and speed necessary for distributed,
collaborative, hypermedia information systems. It is a generic,
stateless, object-oriented protocol which can be used for many tasks [...]

* Basically, HTTP defines how clients (web browsers) and servers can 'talk' to each other
* It also defines the HTTP methods used for all requests (i.e. GET / POST etc)

---

# Requests

In the world of web browsers (and therefore HTTP), a request consists of:

* A request method (usually GET or POST)
* Some headers...
* ...and an optional request body (the data you're sending)

it will also contain:

* A URL or IP address of the server we wish to send the request

Example:

```http
GET https://www.google.com/

Accept: text/html
Cookie: SID=oQfEb4vGjMxQVS [...]
```

---

# HTTP Methods

When you make a HTTP request, you also provide a HTTP method. This tells the server what action is to be performed for the URL requested with the data provided.

__GET__

Tells the server we want it to return some content for the given URL. It should also *not* change the representation of the resource at the given URL.

__POST__

We want to POST (or create) some data to (on) the server.

__PUT / PATCH__

We want to update some data on the server.

__DELETE__

We want to remove some data from the server.

---

# Responses

A HTTP Response is how the browser answers our Requests. A Response will always have the following properties:

* A HTTP status code
* Some headers
* A body

The body will usually contain some HTML, but it could also contain JSON, XML, text or an image (or other type of file content). The type of content returned is specified by the `Content-Type` header.

---

# HTTP Status Codes

* 1xx - Informational
* 2xx - Success
* 3xx - Redirection
* 4xx - Client Error
* 5xx - Server Error

See https://www.restapitutorial.com/httpstatuscodes.html or https://http.cat/

---

# REST

REST stands for Representational State Transfer. It is a style of defining and building APIs - an API written using REST is often called 'RESTful'.

> The basic idea of REST is that a resource, e.g. a document, is transferred via well-recognized, language-agnostic, and reliably standardized client/server interactions. Services are deemed RESTful when they adhere to these constraints.

https://developer.mozilla.org/en-US/docs/Glossary/REST

---

# REST (continued)

Your app will be calling *your* API, so *you* decide how you to want to build it. REST might help you, or it might make things more complicated.

A set of REST API end-points for handling 'Posts' in a social-media type application might look like this:

| HTTP method | URL path      | Description               |
| ----------- | -------- | ------------------------- |
| `GET`         | `/posts/`  | Return all of the posts   |
| `GET`         | `/posts/1` | Return a single post      |
| `POST`        | `/posts/`  | Create a post             |
| `PUT`         | `/posts/1` | Completely replace a post |
| `PATCH`       | `/posts/1` | Partially replace a post  |
| `DELETE`      | `/posts/1` | Delete a post             |

---

# Cookies and Sessions

Note: As our app will be API based (front-end calling back-end API), we won't be using cookies or sessions, but it's good to know what they are.

__Cookies__

* Cookies are simply pieces of information stored in the web browser
* They are sent from the server to the browser
* Passed to / from the server via the 'Cookie' header
* Can only store a small amount of information (around 4Kb)

__Sessions__

* Sessions are completely server-side constructs (they only exist on the server)
* Use a session id stored in a cookie to link to a user to the data on the server
* Keep track of application state for a session (e.g. 'is the user logged in?')
* Can be 'native' (built-in / file) or backed by a database / other store

---

# AJAX Requests

* AJAX (asynchronous JavaScript and XML) Requests are used to load and save data from / to a server in the background
* Initiated from Javascript
* Browser stays on the same page
* Also called an XHR (XML HTTP Request)

Note: We're not using anything to with XML! AJAX / XHR was termed long before JSON was widely used

---

# AJAX Requests (Continued)

Making a 'traditional' (i.e. not `fetch` based) XHR request in Javascript looks like this:

```javascript
var name = 'John Smith',
    xhr = new XMLHttpRequest();

xhr.open('POST', '/some-resource/');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.onload = function() {
    if (xhr.status === 200) {
        alert('Success! Response was: ' + xhr.responseText);
    }
    else {
        alert('Request failed.  Returned status of ' + xhr.status);
    }
};

xhr.send(JSON.stringify({
    data: name
});
```

---

# AJAX Requests (Continued)

The `fetch` based equivalent looks like this:

```javascript
var name = 'John Smith';

// Make a POST request
var promise = fetch('/some-resource', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        data: name
    })
});
```

---

# AJAX Requests (Continued)

```javascript
// Handle the response and any errors
promise.then(response => {
    if (!response.ok) {
        throw new Error("HTTP status: " + response.status);
    }
    return response.json();
})
.then(data => {
    alert('Success! Response was: ' + data);
})
.catch(error => {
    alert(error);
});
```

---

# Additional Resources

* HTTP Methods - https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
* HTTP/1.0 specification - https://tools.ietf.org/html/rfc1945
* HTTP Status Cats - https://http.cat/
