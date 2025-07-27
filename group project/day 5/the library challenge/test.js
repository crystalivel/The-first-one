const books = require("./books.json");
function groupByGenre(){ 
let fitting = [];
for (const book of books) {
    for (let i = 0; i < book.genres.length; i++) {
        let genre = book.genres[i]
        if (book.genres[i] === "genre") {
        genre.push(book.title);}
    }
}

console.log(fitting);
}