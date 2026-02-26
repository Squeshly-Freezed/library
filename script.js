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
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const readStatus = document.querySelector("#readstatus");
const form = document.querySelector("form");
function getBookDetails () {
    !isMobileViewport ? modal.showModal() : setTimeout( () => {
        modal.showModal();
    }, 750);
    if (form.addEventListener) {
        form.addEventListener("submit", function(event) {
        event.preventDefault();
        addBookToLibrary();
        modal.close();
        form.reset();
        });
    };
    // console.log("finished executing getBookDetails");
}
addBookButton.addEventListener("pointerup", getBookDetails);



function addBookToLibrary() {
    const book = new Book(title.value, author.value, pages.value, readStatus.value);
    myLibrary.push(book);
    console.log(myLibrary);
    console.log("finished executing addBookToLibrary");
}



const book = document.querySelector(".book");
function displayBooks() {
    myLibrary.forEach((book, index) => {
        //update DOM
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






