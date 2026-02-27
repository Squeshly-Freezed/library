const myLibrary = [];
const isMobileViewport = window.matchMedia("(max-width: 768px)").matches;

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



const addBookButton = document.querySelector(".addbookbutton");
const modal = document.querySelector(".modal");
function showModal () {
    !isMobileViewport ? modal.showModal() : setTimeout( () => {
        modal.showModal();
    }, 750);
}
addBookButton.addEventListener("pointerup", showModal);



const form = document.querySelector("form");
function submitData (event) {
    event.preventDefault();
    addBookToLibrary();
    modal.close();
    form.reset();
}
form.addEventListener("submit", submitData);



const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const readStatus = document.querySelector("#readstatus");
function addBookToLibrary() {
    const book = new Book(title.value, author.value, pages.value, readStatus.value);
    myLibrary.push(book);
    displayBooks();
    console.log(myLibrary);
    // console.log("finished executing addBookToLibrary");
}


const bookGUI = document.querySelector(".bookgui");
const book = document.querySelector(".book");
function displayBooks() {
    myLibrary.forEach((book) => {
                // let newBook = book.id;
                newBook = document.createElement("div");
                newBook.classList.add("book");
                newBook.textContent = `Title: ${book.title}\nAuthor: ${book.author}\nPages: ${book.pages}\nFinished: ${book.readStatus}`;
                bookGUI.appendChild(newBook);
                console.log(`added ${newBook}book to display`);
        });
};



Book.prototype.changeReadStatus = function() {
    if (this.readStatus) {
        !this.readStatus; 
    } else if (!this.readStatus) {
        this.readStatus;
    }
};



const cancelButton = document.querySelector(".cancel");
cancelButton.addEventListener("pointerup", () => {
    modal.close();
});

displayBooks();




