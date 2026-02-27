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
    this.isDisplayed = false;
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

const cancelButton = document.querySelector(".cancel");
cancelButton.addEventListener("pointerup", () => {
    modal.close();
});



const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const readStatus = document.querySelector("#readstatus");
function addBookToLibrary() {
    const book = new Book(title.value, author.value, pages.value, readStatus.value);
    //may need to name elements by UUID here
    myLibrary.push(book);
    displayBooks();
    console.log(myLibrary);
}


const bookGUI = document.querySelector(".bookgui");
const book = document.querySelector(".book");
function displayBooks() {
    myLibrary.forEach((book) => {
        if (!book.isDisplayed) {
            book.isDisplayed = true;
            bookDiv = document.createElement("div");
            bookDiv.classList.add("book");
            bookDiv.textContent = `Title: ${book.title}\n\nAuthor: ${book.author}\n\nPages: ${book.pages}\n\nFinished: ${book.readStatus}`;
            bookDiv.dataset.id = book.id;
            removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.addEventListener("pointerup", removeBook);
            bookDiv.appendChild(removeButton);
            chooseRandomBookBackground(bookDiv);
            bookGUI.appendChild(bookDiv);
        }
    });
};



function removeBook(event) {
    const itemToDelete = removeButton.parentElement.dataset.id;
    const index = myLibrary.indexOf(itemToDelete);
    if (index > -1) myLibrary.splice(index, 1);
    event.target.parentElement.remove();
    console.log(myLibrary);
}



function chooseRandomBookBackground(bookDiv) {
    let randomNumber = Math.floor(Math.random() * 5) + 1;
    switch (randomNumber) {
    
        case 1:
            bookDiv.style.backgroundImage = ("url('./img/redbooktransparent.png')");
            break;
        case 2:
            bookDiv.style.backgroundImage = ("url('./img/purplebooktransparent.png')");
            break;
        case 3:
            bookDiv.style.backgroundImage = ("url('./img/keybooktransparent.png')");
            break;
        case 4:
            bookDiv.style.backgroundImage = ("url('./img/greenbooktransparent.png')");
            break;
        case 5:
            bookDiv.style.backgroundImage = ("url('./img/blackbooktransparent.png')");
            break;
    }
}



Book.prototype.changeReadStatus = function() {
    if (this.readStatus) {
        !this.readStatus; 
    } else if (!this.readStatus) {
        this.readStatus;
    }
};





displayBooks();




