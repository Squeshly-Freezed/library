const myLibrary = [];

const addBookButton = document.querySelector(".addbookbutton");


function Book(title, author, pages, readStatus) {
    if (!new.target) {
        throw Error("You must use 'new' keyword when instantializing object");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
    this.id = crypto.randomUUID();
}

Book.prototype.changeReadStatus = function() {
    if (this.readStatus) {
        !this.readStatus; 
    } else if (!this.readStatus) {
        this.readStatus;
    }
};

function addBookToLibrary(title, author, pages, readStatus) {
    const book = new Book("poo", "wee", 123, true);
    myLibrary.push(book);
    console.log(myLibrary);
}

function displayBooks() {
    myLibrary.forEach((book, index) => {
        //update DOM
    });
};