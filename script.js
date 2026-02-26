const myLibrary = [];

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