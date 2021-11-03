class: middle, title-page

# Web Apps - CC006005-20

## Introduction

### Gary Renes

---

# What we'll cover

Topics we'll cover over the course of the module:

1. What's a web app? How do they work?
2. Introduction to Javascript
3. Source control (using Git and Github)
4. Users, Tokens, Requests, Responses
5. Databases
6. Security
7. Wireframes, Specifications
8. APIs, AJAX and JSON
9. File uploads
10. App deployment

---

# What's a web app?

From Wikipeida:

> In computing, a web application or web app is a _client–server_ computer program which the client (including the user interface and client-side logic) runs in a _web browser_. Common web applications include webmail, online retail sales, and online auction.

This isn't a great definition (as we'll see later), basically because *all* websites are client-server computer programs which run in a web browser.

---

# What's the difference between a web app and a website?

Have a think about this for a few minutes, then try to find:

1. An example of a website
2. An example of a web app

Visit this URL:

[Google Doc](https://docs.google.com/document/d/1jxpZ7szLpstXQ7wvb23Y5_nDpsSx1Sg36X4YAtmU5lw/edit?usp=sharing)

Add a note with your chosen URLs, and another note with what you think the difference is between a website and a web app.

---

# What's the difference between a web app and a website?

From Wikipeida:

> _The general distinction between a dynamic web page of any kind and a "web application" is unclear_. Web sites most likely to be referred to as "web applications" are those _which have similar functionality to a desktop software application_, or to a mobile app.

---

# So, what's a web app again?

We'll use the following definition from here on in:

> A web app is an application built using _web technologies_ that runs in a web browser. It gives _users_ access to application-specific _functionality_ which allows them to perform operations on information stored in a _database_.

__Example web apps__:

Facebook, Twitter, Snapchat, Instagram, Google Docs

__Example websites__:

BBC News, Google.com

---

class: middle, title-page, center

## In reality, all non-static (i.e. sites that use a database) websites are technically web apps!

---

# How do web apps work?

<img src="images/request.png">

* The front-end of the application is downloaded and runs in the users browser (HTML, JS, CSS)
* A user interacts with the front-end of the applicaiton to manipulate data (via forms or other UI controls)
* This data is submitted via a _request_ to the back-end (server-side) part of the app (Javascript & SQLite in our case)
* The data is persisted, and the app UI is updated to reflect the changes (by sending a _response_)

---

# Web technologies

**What we'll cover**

### Client Side (Front-end)

* HTML, Javascript, CSS

### Server Side (Back-end)

* NodeJS (server-side Javascript) & SQLite

---

# Web technologies

There are *lots* of server-side (back-end) languages and databases that we could use, but we'll stick to Javascript and SQLite for the duration of the module. There are *some* options on the client-side (front-end), but they will always be transpiled in to HTML and Javascript so they can run in the browser.

> You are free to use *any* language(s) and database you wish to implement your web app, if you feel confident in doing so

---

# Web technologies

**Some alternatives**

### Client Side (Front-end)

* Front-end frameworks (VueJS, React)

### Server Side (Back-end)

#### Languages

* PHP, Ruby, Python

#### Databases

* PostgreSQL, MongoDB

---


# Users

Users == People

* User accounts are required to log in and access (some / all) of the web app functionality
* User accounts allow multiple users to use the same app (i.e. access and run the same code)
* A particular users data is associated with their user account

---

# Functionality

Functionality == Features

Some examples:

* Editing documents
* Managing photos
* Creating posts, comments
* Uploading files (photos, images, audio, PDFs)

---

# Databases

* Stores content created by users
* Are generally 'relational' - i.e an item of data can be related to another (e.g. a 'Post' can be related to the 'User' who created it)
* Allow us to perform queries against the data (e.g. 'Return all the Posts by User id 1 that were created in the last 7 days')

---

# Any questions?

---

# Additional Resources

* Visual Studio Code - https://code.visualstudio.com/
* GitHub - https://github.com
* Git - https://git-scm.com

* https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works
