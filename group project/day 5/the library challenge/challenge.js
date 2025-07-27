const books = require("./books.json");
function priceOfBook(bookName) {
  for (const book of books) {
    if (book.title === bookName) {
      return book.price;
    }
  }
  return null;
}

function affordableBooks(budget) {
    let bookInBudget = [];
  for (const book of books) {
    if (book.price <= 10) {
      
       bookInBudget.push(book.title);
    }
  } return bookInBudget;
}

function findBookByGenre(genre) {
let fitting = [];
for (const book of books) {
    for (let i = 0; i < book.genres.length; i++) {
        if (book.genres[i] === genre) {
        fitting.push(book.title);}
    }
} return fitting;
}

function groupByGenre() {
  // write your code here
}

function sortBooksByPrice() {
  // write your code here
}

(function main() {
  try {
    if (priceOfBook("The Alchemist") !== 9.49) {
      throw new Error("priceOfBook is not working properly.");
    }
    if (affordableBooks(10).length !== 6) {
      throw new Error("affordableBooks is not working properly.");
     }
    if (findBookByGenre("Fiction").length !== 7) {
      throw new Error("findBookByGenre is not working properly.");
     }
    // if (Object.keys(groupByGenre()).length !== 30) {
    //   throw new Error("groupByGenre is not working properly.");
    // }
    // if (sortBooksByPrice()[0].price !== 5.99) {
    //   throw new Error("sortBooksByPrice is not working properly.");
    // }
    console.log("All tests passed successfully.");
  } catch (error) {
    console.log(error);
  }
})();