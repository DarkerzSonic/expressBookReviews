const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password){
    if (!isValid(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});    
      }
  }
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books));
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const targetISBN = req.params.isbn;
  res.send(books[targetISBN]);
  //return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const targetAuthor = req.params.author;
  const result = Object.entries(books).filter((key, value)=>{
    //console.log(books[value+1].author);
    if (books[value+1].author === targetAuthor)
        return books[value+1];
  });
  res.send(result);

  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const targetTitle = req.params.title;
  const result = Object.entries(books).filter((key, value)=>{
    //console.log(books[value+1].author);
    if (books[value+1].title === targetTitle)
        return books[value+1];
  });
  res.send(result);
  //return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const targetISBN = req.params.isbn;
  const result = books[targetISBN];
  res.send(result);
  //return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
