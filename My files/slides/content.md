class: middle, title-page

# Web Apps - Databases

### Web Apps - CCO6005-20

---

# Databases - SQLite

1. Introduction
2. Basic Queries
3. Relationships

---


# Introduction

A database is comprised of a number of tables. Each of these __tables__ has __columns__, and each of these columns has a __type__. A type can have an optional length and other modifiers.

We need a database to store all the information a user enters and needs to access whilst using our Web App.

---

# Basic Queries

## CREATE table

Used to create a table and its associated columns.

```sql
CREATE TABLE "users" (
    "id"        INTEGER UNIQUE,
    "username"  TEXT NOT NULL,
    "password"  TEXT NOT NULL,
    PRIMARY KEY("id" AUTOINCREMENT)
);
```

---

# SELECT

Used to retrieve data from a table.

```sql
SELECT * FROM TABLE WHERE <condition>;
```

Examples:

```sql
-- Find user by username and password
SELECT * FROM users WHERE username = "user@example.com" AND password = "password";

-- Find all users that don't match a given username
SELECT * FROM users WHERE username != "user@example.com";
```

---

# INSERT

Used to create data in a table

```sql
INSERT INTO "users"
    ("username", "password")
VALUES
    ("admin@example.com", "password"),
    ("user@example.com", "password");
```

---

# UPDATE

Used to update an existing row in a table

```sql
-- Change the username for user with an id of 1
UPDATE users SET username = "test@example.com" WHERE id=1;
```

---

# DELETE

Used to delete a row from a table

```sql
-- Delete the user with an id of 2
DELETE FROM users WHERE id=2;
```

---

# Relationships

SQLite is a relational database, which means that database tables can be related to each other. The relationship types we'll cover are:

* One-to-one
* One-to-many
* Many-to-many

---

# One-to-one

A row in a table has one (and only one) related row in another table. If a row is only allowed to have one related row in another table, then this is called a "one-to-one" relationship.

> "A user has one user profile"

```
users                     user_profiles
users.user_profile_id --> user_profiles.id
```

---

# One-to-one (continued)

```sql
CREATE TABLE "users" (
    "id"              INTEGER NOT NULL,
    "username"        TEXT DEFAULT NULL,
    "password"        TEXT DEFAULT NULL,
    "user_profile_id" INTEGER DEFAULT NULL,
    PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE "user_profiles" (
    "id"            INTEGER NOT NULL,
    "first_name"    TEXT DEFAULT NULL,
    "last_name"     TEXT DEFAULT NULL,
    PRIMARY KEY("id" AUTOINCREMENT)
);
```

---

# One-to-many

A row in a table has multiple related rows in another table. If a row has multiple related rows in another table, then this is called a "one-to-many" relationship.

> "A user can have multiple posts"

```
users        posts
users.id <-- posts.user_id
```

---

# One-to-many (Continued)

```sql
CREATE TABLE "users" (
    "id"              INTEGER NOT NULL,
    "username"        TEXT DEFAULT NULL,
    "password"        TEXT DEFAULT NULL,
    "user_profile_id" INTEGER DEFAULT NULL,
    PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE "posts" (
  "id"                INTEGER NOT NULL,
  "title"             TEXT DEFAULT NULL,
  "content"           TEXT DEFAULT NULL,
  "user_id"           INTEGER DEFAULT NULL,
  PRIMARY KEY("id" AUTOINCREMENT)
);
```

---

# Many-to-many

A many-to-many relationship needs an intermediate 'mapping' table to represent the multiple relationships between one table and another. Any example might be image 'tags', where multiple tags can belong to multiple images.

> "An image has multiple tags, and tags can belong to multiple images"

```
images       image_tags                                tags
images.id -> image_tags.image_id, image_tags.tag_id -> tags.id
```

---

# Many-to-many (Continued)

```sql
CREATE TABLE `tags` (
  "id"         INTEGER NOT NULL,
  "name"       TEXT DEFAULT NULL,
  PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE "images" (
  "id"          INTEGER NOT NULL,
  "upload_path" TEXT DEFAULT '',
  PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE "images_tags" (
  "tag_id"     INTEGER NOT NULL,
  "image_id"   INTEGER NOT NULL
);
```

---

# Retrieving Related Rows

We retrieve rows from multiple tables by using a __JOIN__. This joins tables together based __ON__ a supplied condition.

The query below returns the user and their profile from the database (if one exists):

```sql
SELECT *
    FROM users
    JOIN user_profiles ON user_profiles.id = users.user_profile_id
    WHERE users.id = 1;
```

---

# Retrieving Releated Rows (continued)

A modified version of the query will also work to retrieve a users posts:

```sql
SELECT *
    FROM users
    JOIN posts ON posts.user_id = users.id
    WHERE users.id = 1;
```

---

# Retrieving Releated Rows (continued)

The following query will return the tag ids and the tag names that are related to the image that has an id of 1:

```sql
SELECT tags.id, tags.name
    FROM images
    JOIN images_tags ON images_tags.image_id = images.id
    JOIN tags ON        images_tags.tag_id = tags.id
    WHERE images.id = 1;
```

---

# Additional Resources

There's lots more we haven't covered like __FOREIGN KEYS__, __INDEXES__ and __CONSTRAINTS__. Feel free to read up about these if you have time.

* https://sqlite.org/foreignkeys.html
* https://www.tutorialspoint.com/sqlite/sqlite_constraints.htm
* https://sqlite.org/lang_createindex.html
